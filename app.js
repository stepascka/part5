var main = function () {
	"use strict";

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});

	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element),
			$content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
			} 
			else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));					
				});
				$("main .content").append($content);
			} 
			else if ($element.parent().is(":nth-child(3)")) {
					var tags = [];
					toDoObjects.forEach(function (toDo) {
						toDo.tags.forEach(function (tag) {
							if (tags.indexOf(tag) == -1) {
								tags.push(tag);
							}
						});
					});

					var tagObjects = tags.map(function (tag) {
						var toDosWithTag = [];
						toDoObjects.forEach(function (toDo) {
							if (toDo.tags.indexOf(tag) != -1) {
							toDosWithTag.push(toDo.description);
							}
						});
						return { "name": tag, "toDos": toDosWithTag };
					});

				tagObjects.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} 
			else if ($element.parent().is(":nth-child(4)")) {				
				var $inputLabel = $("<p>").text("Новая задача: ");
				$("main .content").append($inputLabel);
				var $input = $("<input>").addClass("description");
				$("main .content").append($input);				
				var $tagLabel = $("<p>").text("Тэги: ");
				$("main .content").append($tagLabel);
				var $tagInput = $("<input>").addClass("tags");
				$("main .content").append($tagInput);
				var $button = $("<button>").text("+");
				$("main .content").append($button);
				$button.on("click", function () {
					var description = $input.val();
					var tags = $tagInput.val().split(",");
					toDoObjects.push({"description":description, "tags":tags});
					toDos = toDoObjects.map(function (toDo) {
						return toDo.description;
					});
					$input.val("");
					$tagInput.val("");
				});
			}

			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");

};


$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});
