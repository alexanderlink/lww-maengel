/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./library","sap/ui/core/Element","sap/ui/core/EnabledPropagator","./DialogRenderer","sap/ui/core/Lib","sap/ui/core/message/MessageType","sap/ui/Device","./Bar","./Button","./Title","sap/m/OverflowToolbarLayoutData","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/isEmptyObject"],function(e,t,i,s,n,a,o,r,l,u,g,h,p,jQuery,c,d){"use strict";var f=t.OverflowToolbarPriority;var _=t.ListType;var v=t.P13nPanelType;var m=t.ListMode;var b=t.ButtonType;var I=t.BackgroundDesign;var y;var T;var N={apiVersion:2,render:function(e,t){n.render.apply(this,arguments);var i=t._getVisiblePanelID();var s=t.getVisiblePanel();if(i&&s){e.openStart("div",i);e.openEnd();e.renderControl(s);e.close("div")}}};var P=e.extend("sap.m.P13nDialog",{metadata:{deprecated:true,library:"sap.m",properties:{initialVisiblePanelType:{type:"string",group:"Misc",defaultValue:null},showReset:{type:"boolean",group:"Appearance",defaultValue:false},showResetEnabled:{type:"boolean",group:"Appearance",defaultValue:false},validationExecutor:{type:"object",group:"Misc",defaultValue:null}},aggregations:{panels:{type:"sap.m.P13nPanel",multiple:true,singularName:"panel",bindable:"bindable"}},events:{ok:{},cancel:{},reset:{}}},renderer:N});s.apply(P.prototype,[true]);P.prototype.init=function(t){this.addStyleClass("sapMP13nDialog");e.prototype.init.apply(this,arguments);this._oResourceBundle=a.getResourceBundleFor("sap.m");this._mValidationListener={};this._createDialog();this._bTabBarUsed=true;this._mVisibleNavigationItems={};this._bNavigationControlsPromiseResolved=false;this._oNavigationControlsPromise=this._requestRequiredNavigationControls();this._oObserver=new p(V.bind(this));this._oObserver.observe(this,{properties:["showReset","showResetEnabled"],aggregations:["panels"]})};P.prototype.setShowResetEnabled=function(e){return this.setProperty("showResetEnabled",e,true)};P.prototype._createDialog=function(){if(r.system.phone){var e=this;this.setStretch(true);this.setVerticalScrolling(false);this.setHorizontalScrolling(false);this.setCustomHeader(new l(this.getId()+"-phoneHeader",{contentLeft:new u(this.getId()+"-backToList",{visible:false,type:b.Back,press:function(){e._backToList()}}),contentMiddle:new g(this.getId()+"-phoneTitle",{text:this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"),level:"H2"})}));this.addButton(this._createOKButton());this.addButton(this._createCancelButton());this.addButton(this._createResetButton())}else{this.setHorizontalScrolling(false);this.setContentWidth("65rem");this.setContentHeight("40rem");this.setDraggable(true);this.setResizable(true);this.setTitle(this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS"));this.addButton(this._createOKButton());this.addButton(this._createCancelButton());this.addButton(this._createResetButton())}};P.prototype._showValidationDialog=function(e,t,i){var s=[];var n=[];this._prepareMessages(t,i,s,n);var o=this;return new Promise(function(t){sap.ui.require(["sap/m/MessageBox"],function(i){var r="";if(n.length){n.forEach(function(e,t,i){r=(i.length>1?"• ":"")+e.messageText+"\n"+r});i.show(r,{icon:i.Icon.ERROR,title:a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_TITLE_ERROR"),actions:[i.Action.CLOSE],styleClass:o.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}else if(s.length){s.forEach(function(e,t,i){r=(i.length>1?"• ":"")+e.messageText+"\n"+r});r=r+a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_MESSAGE_QUESTION");i.show(r,{icon:i.Icon.WARNING,title:a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_TITLE"),emphasizedAction:a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_FIX"),actions:[a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_FIX"),i.Action.IGNORE],onClose:function(t){if(t===i.Action.IGNORE){e()}},styleClass:o.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}t()})})};P.prototype._prepareMessages=function(e,t,i,s){if(!e.length&&!t.length){return}e.forEach(function(e){switch(e){case v.filter:t.push({messageType:o.Warning,messageText:a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VALIDATION_MESSAGE")});break;case v.columns:t.push({messageType:o.Warning,messageText:a.getResourceBundleFor("sap.m").getText("P13NDIALOG_VISIBLE_ITEMS_THRESHOLD_MESSAGE")});break;default:c.error("Panel type '"+e+"' is not supported jet.")}});var n=t.filter(function(e,t,i){for(var s=++t;s<i.length;s++){if(e.messageText===i[s].messageText){return false}}return true});n.forEach(function(e){if(e.messageType===o.Warning){i.push(e)}else if(e.messageType===o.Error){s.push(e)}})};P.prototype._mapPanelToNavigationItem=function(e){if(!e){return null}return r.system.phone?new T(e.getId()+"-navItem",{type:_.Navigation,title:e.getTitle()}):new T(e.getId()+"-navItem",{text:e.getTitle()})};P.prototype._switchPanel=function(e){var t=this._getPanelByNavigationItem(e);this.setVerticalScrolling(t.getVerticalScrolling());if(r.system.phone){var i=this._getNavigationControl();if(i){i.setVisible(false);t.beforeNavigationTo();t.setVisible(true);this.getCustomHeader().getContentMiddle()[0].setText(t.getTitle());this.getCustomHeader().getContentLeft()[0].setVisible(true)}}else{this.getPanels().forEach(function(e){if(e===t){e.beforeNavigationTo();e.setVisible(true)}else{e.setVisible(false)}},this)}this.invalidate()};P.prototype._backToList=function(){var e=this._getNavigationControl();if(e){e.setVisible(true);var t=this.getVisiblePanel();t.setVisible(false);this._updateDialogTitle();this.getCustomHeader().getContentLeft()[0].setVisible(false)}};P.prototype.getVisiblePanel=function(){var e=null;this.getPanels().some(function(t){if(t.getVisible()){e=t;return true}});return e};P.prototype._getVisiblePanelID=function(){var e=this.getVisiblePanel();if(e){return this.getId()+"-panel_"+e.getId()}return null};P.prototype._getPanelByNavigationItem=function(e){for(var t=0,i=this.getPanels(),s=i.length;t<s;t++){if(this._getNavigationItemByPanel(i[t])===e){return i[t]}}return null};P.prototype._getNavigationItemByPanel=function(e){return e?e.data("sapMP13nDialogNavigationItem"):null};P.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);var t=jQuery(this.getFocusDomRef()).find(".sapMDialogScrollCont");var i=this._getVisiblePanelID();if(i&&t){var s=jQuery(document.getElementById(i));s.appendTo(jQuery(t))}};P.prototype._updateDialogTitle=function(){var e=this.getVisiblePanel();var t=this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS");if(!this._isNavigationControlExpected()&&e){switch(e.getType()){case v.filter:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_FILTER");break;case v.sort:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_SORT");break;case v.group:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_GROUP");break;case v.columns:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_COLUMNS");break;case v.dimeasure:t=this._oResourceBundle.getText("P13NDIALOG_TITLE_DIMEASURE");break;default:t=e.getTitleLarge()||this._oResourceBundle.getText("P13NDIALOG_VIEW_SETTINGS")}}if(r.system.phone){this.getCustomHeader().getContentMiddle()[0].setText(t)}else{this.setTitle(t)}};P.prototype._registerValidationListener=function(e,t){if(this.getPanels().indexOf(e)&&t&&this._mValidationListener[e.getType()]===undefined){this._mValidationListener[e.getType()]=t}};P.prototype._callValidationExecutor=function(){var e=this.getValidationExecutor();if(e&&!d(this._mValidationListener)){var t=this;e(this._getPayloadOfPanels()).then(function(e){var i=t._distributeValidationResult(e);for(var s in t._mValidationListener){var n=t._mValidationListener[s];n(i[s]||[])}})}};P.prototype._distributeValidationResult=function(e){var t={};e.forEach(function(e){e.panelTypes.forEach(function(i){if(t[i]===undefined){t[i]=[]}t[i].push({columnKey:e.columnKey,messageType:e.messageType,messageText:e.messageText})})});return t};P.prototype._createOKButton=function(){var e=this;return new u(this.getId()+"-ok",{type:b.Emphasized,text:this._oResourceBundle.getText("P13NDIALOG_OK"),layoutData:new h({priority:f.NeverOverflow}),press:function(){e.setBusy(true);var t=e._getPayloadOfPanels();var i=function(){e.setBusy(false);e.fireOk({payload:t})};var s=[];var n=function(){e.getPanels().forEach(function(e){if(s.indexOf(e.getType())>-1){e.onAfterNavigationFrom()}});i()};e.getPanels().forEach(function(e){if(!e.onBeforeNavigationFrom()){s.push(e.getType())}});var a=[];var o=e.getValidationExecutor();if(o){o(t).then(function(t){if(s.length||t.length){e.setBusy(false);e._showValidationDialog(n,s,t)}else{i()}})}else{if(s.length||a.length){e.setBusy(false);e._showValidationDialog(n,s,a)}else{i()}}}})};P.prototype._createCancelButton=function(){var e=this;return new u(this.getId()+"-cancel",{text:this._oResourceBundle.getText("P13NDIALOG_CANCEL"),layoutData:new h({priority:f.NeverOverflow}),press:function(){e.fireCancel()}})};P.prototype._createResetButton=function(){var e=this;return new u(this.getId()+"-reset",{text:this._oResourceBundle.getText("P13NDIALOG_RESET"),layoutData:new h({priority:f.NeverOverflow}),visible:this.getShowReset(),enabled:this.getShowResetEnabled(),press:function(){i.getElementById(e.getId()+"-ok").focus();e.setShowResetEnabled(false);var t={};e.getPanels().forEach(function(e){t[e.getType()]=e.getResetPayload()});e.fireReset({payload:t})}})};P.prototype._getPayloadOfPanels=function(){var e={};this.getPanels().forEach(function(t){e[t.getType()]=t.getOkPayload()});return e};P.prototype.exit=function(){e.prototype.exit.apply(this,arguments);this._oObserver.disconnect();this._oObserver=undefined;this._bTabBarUsed=false;this._mValidationListener={};this._mVisibleNavigationItems={};this._oNavigationControlsPromise=null};P.prototype._isInstanceOf=function(e,t){var i=sap.ui.require(t);return e&&typeof i==="function"&&e instanceof i};function V(e){if(this._isInstanceOf(e.object,"sap/m/P13nDialog")){var t;switch(e.name){case"panels":var i=e.child?[e.child]:e.children;i.forEach(function(t){switch(e.mutation){case"insert":this._mVisibleNavigationItems[t.sId]=t.getVisible();t.setVisible(false);t.beforeNavigationTo();this._oObserver.observe(t,{properties:["title"]});t.setValidationExecutor(jQuery.proxy(this._callValidationExecutor,this));t.setValidationListener(jQuery.proxy(this._registerValidationListener,this));break;case"remove":delete this._mVisibleNavigationItems[t.sId];this._oObserver.unobserve(t);t.setValidationExecutor();t.setValidationListener();break;default:c.error("Mutation '"+e.mutation+"' is not supported jet.")}},this);if(this._bNavigationControlsPromiseResolved){this._updateDialog()}else{this._oNavigationControlsPromise.then(function(){this._updateDialog()}.bind(this))}break;case"showReset":t=this.getButtons();if(t.length>1){t[2].setVisible(e.current)}break;case"showResetEnabled":t=this.getButtons();if(t.length>1){t[2].setEnabled(e.current);t[2].invalidate()}break;default:c.error("The property or aggregation '"+e.name+"' has not been registered.")}}else if(this._isInstanceOf(e.object,"sap/m/P13nPanel")){if(e.name==="title"){var s=this._getNavigationItemByPanel(e.object);if(s){if(r.system.phone){s.setTitle(e.current)}else{s.setText(e.current)}}}}}P.prototype._isNavigationControlExpected=function(){return this._getCountOfVisibleNavigationItems()>1};P.prototype._getCountOfVisibleNavigationItems=function(){var e=0;for(var t in this._mVisibleNavigationItems){e=this._mVisibleNavigationItems[t]?e+1:e}return e};P.prototype._isNavigationControlExists=function(){return r.system.phone?this.getContent().length>0:!!this.getSubHeader()&&this.getSubHeader().getContentLeft().length>0};P.prototype._getNavigationControl=function(){if(!this._isNavigationControlExists()){this._createNavigationControl()}return r.system.phone?this.getContent()[0]:this.getSubHeader().getContentLeft()[0]};P.prototype._setVisibleOfNavigationControl=function(e){if(!this._isNavigationControlExists()){return}return r.system.phone?this.getContent()[0].setVisible(e):this.getSubHeader().setVisible(e)};P.prototype._createNavigationControl=function(){if(r.system.phone){this.addContent(new y(this.getId()+"-navigationItems",{mode:m.None,itemPress:function(e){this._switchPanel(e.getParameter("listItem"))}.bind(this)}))}else{this.setSubHeader(new l(this.getId()+"-navigationBar",{contentLeft:new y(this.getId()+"-navigationItems",{backgroundDesign:I.Transparent,expandable:false,select:function(e){this._switchPanel(e.getParameter("item"))}.bind(this)})}))}return this._getNavigationControl()};P.prototype._updateDialog=function(){var e=this._getNavigationControl();e.destroyItems();var t=this._determineInitialVisiblePanel();this.getPanels().forEach(function(i){var s=this._mapPanelToNavigationItem(i);i.data("sapMP13nDialogNavigationItem",s);e.addItem(s);var n=r.system.phone?this._mVisibleNavigationItems[i.sId]&&this._getCountOfVisibleNavigationItems()===1:this._mVisibleNavigationItems[i.sId]&&t===i.sId;i.setVisible(n);if(n){this.setVerticalScrolling(i.getVerticalScrolling())}s.setVisible(this._mVisibleNavigationItems[i.sId]);if(n&&e.setSelectedItem){e.setSelectedItem(s)}}.bind(this));this._updateDialogTitle();this._setVisibleOfNavigationControl(this._isNavigationControlExpected())};P.prototype._determineInitialVisiblePanel=function(){if(this.getInitialVisiblePanelType()){for(var e=0;e<this.getPanels().length;e++){if(this.getPanels()[e].getType()==this.getInitialVisiblePanelType()){return this.getPanels()[e].sId}}}var t;this.getPanels().some(function(e){if(this._mVisibleNavigationItems[e.sId]){t=e.sId;return true}}.bind(this));return t};P.prototype._requestRequiredNavigationControls=function(){var e=r.system.phone?"sap/m/List":"sap/m/IconTabBar";var t=r.system.phone?"sap/m/StandardListItem":"sap/m/IconTabFilter";y=sap.ui.require(e);T=sap.ui.require(t);if(y&&T){this._bNavigationControlsPromiseResolved=true;return Promise.resolve()}if(!this._oNavigationControlsPromise){this._oNavigationControlsPromise=new Promise(function(i){sap.ui.require([e,t],function(e,t){y=e;T=t;this._bNavigationControlsPromiseResolved=true;return i()}.bind(this))}.bind(this))}return this._oNavigationControlsPromise};return P});
//# sourceMappingURL=P13nDialog.js.map