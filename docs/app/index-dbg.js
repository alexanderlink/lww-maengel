sap.ui.define([
    "sap/ui/core/mvc/XMLView",
	"sap/ui/core/ComponentContainer"
], (XMLView, ComponentContainer) => {
	"use strict";
	/*
	XMLView.create({
		id: "appView",
		viewName: "ui5.walkthrough.view.App"
	}).then((oView) => oView.placeAt("content"));
	*/
	new ComponentContainer({
		name: "ui5.walkthrough",
		settings : {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");
});
