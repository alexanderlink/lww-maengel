sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, formatterImport, Filter, FilterOperator) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.DefectList", {
        
        formatterObj: formatterImport,

		onInit() {
			const oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			// build filter array
			/*const aFilter = [];
			aFilter.push(new Filter("Erledigt", FilterOperator.NE, "ja"));
			aFilter.push(new Filter("Typ", FilterOperator.NE, "Hinweis"));
			// filter binding
			const oList = this.byId("defectList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);*/
		},

		onFilterDefects(oEvent) {
			// build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("newValue");
			if (sQuery) {
				aFilter.push(new Filter("Beschreibung", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oList = this.byId("defectList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}		
	});
});
