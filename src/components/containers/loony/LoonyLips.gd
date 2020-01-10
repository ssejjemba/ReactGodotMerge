extends Control

var answers = []

var current_story = {}

onready var PlayerText = $VBoxContainer/HBoxContainer/PlayerText
onready var DisplayText = $VBoxContainer/DisplayText
onready var Label = $VBoxContainer/HBoxContainer/Label

func _ready():
	set_current_story()
	DisplayText.text = "Welcome to loony loops, we are going to tell a story... "
	check_playerText_size()
	PlayerText.grab_focus()

func set_current_story():
	randomize()
	var stories = $StoryBook.get_child_count()
	var selected_story = randi() % stories
	current_story.prompts = $StoryBook.get_child(selected_story).prompts
	current_story.story =  $StoryBook.get_child(selected_story).story

#func get_from_json(filename):
#	var file = File.new()
#	file.open(filename, File.READ)
#	var text = file.get_as_text()
#	var data = parse_json(text)
#	file.close()
#	return data

func _on_PlayerText_text_entered(new_text):
	add_player_text()


func _on_OkayButton_pressed():
	if is_story_end():
		get_tree().reload_current_scene()
	else:
		add_player_text()


func add_player_text():
	answers.append(PlayerText.text)
	PlayerText.clear()
	DisplayText.text = ""
	check_playerText_size()


func check_playerText_size():
	if is_story_end():
		end_game()
	else:
		prompt_user()


func is_story_end():
	return answers.size() == current_story.prompts.size()


func prompt_user():
	DisplayText.text += "May I have " + current_story.prompts[answers.size()] + ", please"


func tell_story():
	DisplayText.text = current_story.story % answers


func end_game():
	PlayerText.queue_free()
	Label.text = "Again"
	tell_story()

