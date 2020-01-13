import * as React from 'react';
import styled from 'styled-components';
import RunGameBtn from './GameStuff/RunGameBtn'

const Container = styled.section`
    grid-column: sidebar-start / full-end 6;
    padding: 5rem;
    position: relative;
    height: 110vh;
    background: linear-gradient(rgba(41, 88, 23, 0.7), rgba(41, 88, 23, 0.8)),
        url('https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Status = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* don't consume click events - make children visible explicitly */
    visibility: hidden;
`

const StatusProgress = styled.div`
    width: 366px;
    height: 7px;
    background-color: #38363A;
    border: 1px solid #444246;
    padding: 1px;
    box-shadow: 0 0 2px 1px #1B1C22;
    border-radius: 2px;
    visibility: visible;
`

const StatusProgressInner = styled.div`
    height: 100%;
    width: 0;
    box-sizing: border-box;
    transition: width 0.5s linear;
    background-color: #202020;
    border: 1px solid #222223;
    box-shadow: 0 0 1px 1px #27282E;
    border-radius: 3px;
`

const StatusIndeterminate = styled.div`
    visibility: visible;
    position: relative;
    & > div {
        width: 4.5px;
        height: 0;
        border-style: solid;
        border-width: 9px 3px 0 3px;
        border-color: #2b2b2b transparent transparent transparent;
        transform-origin: center 21px;
        position: absolute;
    }

    & > div:nth-child(1) { transform: rotate( 22.5deg); }
    & > div:nth-child(2) { transform: rotate( 67.5deg); }
    & > div:nth-child(3) { transform: rotate(112.5deg); }
    & > div:nth-child(4) { transform: rotate(157.5deg); }
    & > div:nth-child(5) { transform: rotate(202.5deg); }
    & > div:nth-child(6) { transform: rotate(247.5deg); }
    & > div:nth-child(7) { transform: rotate(292.5deg); }
    & > div:nth-child(8) { transform: rotate(337.5deg); }
`

const StatusNotice = styled.div`
    margin: 0 100px;
    line-height: 1.3;
    visibility: visible;
    padding: 4px 6px;
    visibility: visible;
`

var engine;
var setStatusMode;
var setStatusNotice;

class Game extends React.Component{
    state = {
        isGameRunning: false
    }

    constructor(props){
        super(props)
    }

    componentDidMount(){
        //mount game object
        //this is the function godot generates when you export to html...
        // this.initialiseGameEngine();
    }

    initialiseGameEngine(){
        engine = new Engine;

        const MAIN_PACK = 'index.pck';
        const INDETERMINATE_STATUS_STEP_MS = 100;

        var canvas = document.getElementById('game-canvas');
        var statusProgress = document.getElementById('status-progress');
        var statusProgressInner = document.getElementById('status-progress-inner');
        var statusIndeterminate = document.getElementById('status-indeterminate');
        var statusNotice = document.getElementById('status-notice');

        var initializing = true;
        var statusMode = 'hidden';

        var animationCallbacks = [];
        function animate(time) {
            animationCallbacks.forEach(callback => callback(time));
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

        function adjustCanvasDimensions() {
            canvas.width = 800;
            canvas.height = 700;
        }
        animationCallbacks.push(adjustCanvasDimensions);
        adjustCanvasDimensions();

        setStatusMode = function setStatusMode(mode) {

            if (statusMode === mode || !initializing)
                return;
            [statusProgress, statusIndeterminate, statusNotice].forEach(elem => {
                elem.style.display = 'none';
            });
            if (animateStatusIndeterminate in animationCallbacks) {
                animationCallbacks.erase(animateStatusIndeterminate);
            }
            switch (mode) {
                case 'progress':
                    statusProgress.style.display = 'block';
                    break;
                case 'indeterminate':
                    statusIndeterminate.style.display = 'block';
                    animationCallbacks.push(animateStatusIndeterminate);
                    break;
                case 'notice':
                    statusNotice.style.display = 'block';
                    break;
                case 'hidden':
                    break;
                default:
                    throw new Error('Invalid status mode');
            }
            statusMode = mode;
        }

        function animateStatusIndeterminate(ms) {

            var i = Math.floor(ms / INDETERMINATE_STATUS_STEP_MS % 8);
            if (statusIndeterminate.children[i].style.borderTopColor == '') {
                Array.prototype.slice.call(statusIndeterminate.children).forEach(child => {
                    child.style.borderTopColor = '';
                });
                statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
            }
        }

        setStatusNotice = function setStatusNotice(text) {

            while (statusNotice.lastChild) {
                statusNotice.removeChild(statusNotice.lastChild);
            }
            var lines = text.split('\n');
            lines.forEach((line) => {
                statusNotice.appendChild(document.createTextNode(line));
                statusNotice.appendChild(document.createElement('br'));
            });
        };

        engine.setProgressFunc((current, total) => {

            if (total > 0) {
                statusProgressInner.style.width = current/total * 100 + '%';
                setStatusMode('progress');
                if (current === total) {
                    // wait for progress bar animation
                    setTimeout(() => {
                        setStatusMode('indeterminate');
                    }, 500);
                }
            } else {
                setStatusMode('indeterminate');
            }
        });

        function displayFailureNotice(err) {
            var msg = err.message || err;
            console.error(msg);
            setStatusNotice(msg);
            setStatusMode('notice');
            initializing = false;
        };

        if (!Engine.isWebGLAvailable()) {
            displayFailureNotice('WebGL not available');
        } else {
            setStatusMode('indeterminate');
            engine.setCanvas(canvas);
            engine.startGame("index", MAIN_PACK).then(() => {
                setStatusMode('hidden');
                initializing = false;
            }, displayFailureNotice);
        }
    }

    render(){
        if(this.state.isGameRunning) {
            return this._getGame();
        }else {
            return this._getGameBtn();
        }
    }

    _getGame() {
        return(
            <Container>
                <canvas id='game-canvas'>
                    Godot game goes here
                </canvas>
                <Status id='status'>
                    <StatusProgress id='status-progress' style={{display: 'none'}} onContextMenu={e => e.preventDefault()}>
                        <StatusProgressInner id ='status-progress-inner'></StatusProgressInner>
                    </StatusProgress>
                    <StatusIndeterminate id='status-indeterminate' style={{display: 'none'}} onContextMenu={e => e.preventDefault()}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </StatusIndeterminate>
                    <StatusNotice id='status-notice' className='godot' style={{display: 'none'}}></StatusNotice>
                </Status>
            </Container>
        );
    }

    _getGameBtn() {
        return(
            <Container>
                <RunGameBtn callback={this._runGame} />
            </Container>
        );
    }

    _runGame = () => {
        this.setState({isGameRunning: true}, () => {
            this._loadNeccessaryScripts(() => {
                this.initialiseGameEngine();
                this._initializeEventsCatcher();
            })
        });
    }

    _loadNeccessaryScripts = (callback) => {
        const loader = new ScriptsLoader([
            "index.js",
            "gateways.js"
        ], callback);
    }

    _initializeEventsCatcher = () => {
        // Called 20 times per second
        window.setInterval(() => {
            this._fetchEvents();
        }, 50);
    }

    _fetchEvents() {
        if(gatewayToReact.hasEvent()) {		
            do {
                const event = gatewayToReact.popEvent();
                this._onEvent(event.name, event.data);
            }while(gatewayToReact.hasEvent());	
        
            gatewayToReact.clearEventsArray();
        }
    }

    _onEvent = (eName, eData) => {
        switch(eName) {
            case 'ready':
                this._createDemoEventButton();		
                break;
            case 'alert':
                alert(eData);
                break;
            default:
                console.log("Unexpected event:", eName, eData)
        }
    }

    _createDemoEventButton = () => {
        const btn = document.createElement('button');
        btn.addEventListener('click', () => {
            console.log("Clicking...");
            gatewayToGodot.newEvent('js_event', 'This message comes from JS App');
        })
        
        btn.innerHTML = 'Call JS event';
        
        // I know, that I should do this via css, but it's just demo
        btn.style.position = 'fixed';
        btn.style.right = 0;
        btn.style.top = 0;
        btn.style.zIndex = 10;
        
        const body = document.querySelector('body')
        body.appendChild(btn)
    }
}

class ScriptsLoader {
    _scriptsToLoad = 0;
    _loadedCounter = 0;
    _onFinishedCallback = null;

    constructor(scriptsUrlsArray, callback) {
        this._scriptsToLoad = scriptsUrlsArray.length;
        this._onFinishedCallback = callback;

        scriptsUrlsArray.forEach((src) => {
            this._loadScript(src)
        });
    }
    
    _loadScript = (scriptUrl) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
            this._loadedCounter++;
            if(this._loadedCounter >= this._scriptsToLoad) {
                this._onFinishedCallback();
            }
        };

        document.body.appendChild(script);
    } 
}

export default Game;