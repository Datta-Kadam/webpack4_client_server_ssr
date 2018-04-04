/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1ead5f1733726ea23a8a"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~bundle"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/components/Response.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/Response.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".CodeMirror-scroll {\r\n    background-color: blue\r\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/components/header.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/header.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* a {\r\n    background-color: red;\r\n} */", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/components/simulate_form.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/components/simulate_form.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* .submitForm {\r\n    background-image: url('/../../images/Penguins.jpg');\r\n} */", ""]);

// exports


/***/ }),

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getReleaseData = getReleaseData;
exports.getProjectData = getProjectData;
exports.getApiData = getApiData;
exports.getDefaultPair = getDefaultPair;
exports.simulateSubmit = simulateSubmit;
exports.XmlParserAction = XmlParserAction;

var _axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var _axios2 = _interopRequireDefault(_axios);

var _types = __webpack_require__(/*! ../actions/types */ "./src/actions/types.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var ROOT_URL = 'http://localhost:3001';

function getReleaseData() {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return _axios2.default.get(ROOT_URL + '/client/release').then(function (response) {
            // console.log(response.data.release);
            dispatch({ type: _types.GET_RELEASE, payload: response.data.release });
            // return response;
        });
    };
}

function getProjectData(rel) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return _axios2.default.get(ROOT_URL + '/client/project/' + rel).then(function (response) {
            //console.log(response.data.release);
            dispatch({ type: _types.GET_PROJECT, payload: response.data.project });
        });
    };
}

function getApiData(proj) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return _axios2.default.get(ROOT_URL + '/client/api/' + proj).then(function (response) {
            //console.log(response.data.release);
            dispatch({ type: _types.GET_API, payload: response.data.api });
        });
    };
}

function getDefaultPair(release, projectName, apiName) {
    return function (dispatch) {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        //console.log("release,projectName,apiName",release,projectName,apiName);
        return _axios2.default.get(ROOT_URL + '/client/reqrespair/' + release + '/' + projectName + '/' + apiName).then(function (response) {
            // console.log(response.data.request);
            debugger;
            dispatch({ type: _types.DEFAULT_REQRES, payload: response.data });
        });
    };
}

function simulateSubmit(formData) {
    return function () {
        //GET THE RELEASE DATA FROM BACKEND AS INITIAL STATE
        return _axios2.default.post(ROOT_URL + '/client/simulate', { credentials: 'same-origin' }, formData).then(function (response) {
            console.log(response);
        });
    };
}

function XmlParserAction(valid) {
    return function dispatch() {
        dispatch({ type: _types.XML_VALID, payload: valid });
    };
}
// /*Request/response actions to update the store with one instance of code mirror */

// export function codeMirredPresent(present){

//     return function(dispatch){
//         dispatch({type:CODE_MIRROR_PRESENT,payload:true});
//     }
// }

;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(ROOT_URL, 'ROOT_URL', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(getReleaseData, 'getReleaseData', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(getProjectData, 'getProjectData', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(getApiData, 'getApiData', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(getDefaultPair, 'getDefaultPair', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(simulateSubmit, 'simulateSubmit', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    reactHotLoader.register(XmlParserAction, 'XmlParserAction', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/index.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/actions/types.js":
/*!******************************!*\
  !*** ./src/actions/types.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var GET_RELEASE = exports.GET_RELEASE = 'get_release';
var GET_PROJECT = exports.GET_PROJECT = 'get_project';
var GET_API = exports.GET_API = 'get_api';
var DEFAULT_REQRES = exports.DEFAULT_REQRES = 'default_reqres';
var SIMULATE_SUBMIT = exports.SIMULATE_SUBMIT = 'simulate_submit';
var XML_VALID = exports.XML_VALID = 'valid_xmls';
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GET_RELEASE, 'GET_RELEASE', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  reactHotLoader.register(GET_PROJECT, 'GET_PROJECT', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  reactHotLoader.register(GET_API, 'GET_API', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  reactHotLoader.register(DEFAULT_REQRES, 'DEFAULT_REQRES', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  reactHotLoader.register(SIMULATE_SUBMIT, 'SIMULATE_SUBMIT', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  reactHotLoader.register(XML_VALID, 'XML_VALID', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/actions/types.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/Request.js":
/*!***********************************!*\
  !*** ./src/components/Request.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _XmlParser = __webpack_require__(/*! ../components/commonComponents/XmlParser */ "./src/components/commonComponents/XmlParser.js");

var _XmlParser2 = _interopRequireDefault(_XmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

// import CodeMirror from 'codemirror';
// import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/xml/xml.js';
// import 'codemirror/mode/markdown/markdown.js';
var CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    CodeMirror = __webpack_require__(/*! codemirror */ "./node_modules/codemirror/lib/codemirror.js");
    __webpack_require__(/*! codemirror/mode/javascript/javascript */ "./node_modules/codemirror/mode/javascript/javascript.js");
    //import 'codemirror/mode/xml/xml.js';
    //require('./Request.css');
    //import 'codemirror/mode/markdown/markdown.js';
}

var Request = function (_Component) {
    (0, _inherits3.default)(Request, _Component);

    function Request(props) {
        (0, _classCallCheck3.default)(this, Request);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Request.__proto__ || (0, _getPrototypeOf2.default)(Request)).call(this, props));

        _this.state = {
            validRequest: false
        };
        return _this;
    }
    // debugger;;


    (0, _createClass3.default)(Request, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            //debugger;
            this.requestEditor = CodeMirror.fromTextArea(document.getElementById('request'), {
                theme: 'eclipse',
                lineNumbers: true
            });

            this.requestEditor.on('change', function (value) {
                // debugger;
                console.log('value111', value);
                _this2.requestEditor.save();
                _this2.requestValue = _this2.requestEditor.getValue();
                // debugger;
                if ((0, _XmlParser2.default)(_this2.requestEditor.getValue().trim())) {
                    _this2.setState({ validRequest: true });
                } else {
                    _this2.setState({ validRequest: false });
                }
                debugger;
                _this2.props.onRequestChange(_this2.requestEditor.getValue());
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //  debugger;
            if (nextProps.defaultReq) {
                //to avoid looping and stack overflow
                //   this.requestEditor.off('change');
                this.requestEditor.setValue(nextProps.defaultReq);
                // this.requestEditor.on('change');
            }
            // debugger;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'request' },
                        'Request:'
                    ),
                    _react2.default.createElement('textarea', {
                        ref: function ref(input1) {
                            return _this3.requestValue = input1;
                        },
                        className: 'form-control',
                        id: 'request'
                    })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    this.state.validRequest ? 'Valid Request Xml' : 'Invalid Request Xml'
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);
    return Request;
}(_react.Component);

function mapStateToProps(state) {
    return {
        defaultReq: state.fetchReducer.defaultReq,
        count: state.fetchReducer.count
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Request);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CodeMirror, 'CodeMirror', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Request.js');
    reactHotLoader.register(Request, 'Request', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Request.js');
    reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Request.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Request.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/Response.css":
/*!*************************************!*\
  !*** ./src/components/Response.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./Response.css */ "./node_modules/css-loader/index.js!./src/components/Response.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!./Response.css */ "./node_modules/css-loader/index.js!./src/components/Response.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./Response.css */ "./node_modules/css-loader/index.js!./src/components/Response.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/Response.js":
/*!************************************!*\
  !*** ./src/components/Response.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _XmlParser = __webpack_require__(/*! ../components/commonComponents/XmlParser */ "./src/components/commonComponents/XmlParser.js");

var _XmlParser2 = _interopRequireDefault(_XmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

// import CodeMirror from 'codemirror';
// import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/xml/xml.js';
// import 'codemirror/mode/markdown/markdown.js';

var CodeMirror = null;
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
    CodeMirror = __webpack_require__(/*! codemirror */ "./node_modules/codemirror/lib/codemirror.js");
    __webpack_require__(/*! codemirror/mode/javascript/javascript */ "./node_modules/codemirror/mode/javascript/javascript.js");
    //import 'codemirror/mode/xml/xml.js';
    //import 'codemirror/mode/markdown/markdown.js';
    __webpack_require__(/*! ./Response.css */ "./src/components/Response.css");
}

var Response = function (_Component) {
    (0, _inherits3.default)(Response, _Component);

    function Response(props) {
        (0, _classCallCheck3.default)(this, Response);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Response.__proto__ || (0, _getPrototypeOf2.default)(Response)).call(this, props));

        _this.state = {
            validResponse: false
        };
        return _this;
    }
    //using componentDidMount() only one instance on codemirror wouuld be created and preserved


    (0, _createClass3.default)(Response, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            //   debugger;   
            this.responseEditor = CodeMirror.fromTextArea(document.getElementById('response'), {
                theme: 'eclipse',
                lineNumbers: true
            });
            this.responseEditor.on('change', function () {
                _this2.responseEditor.save();
                _this2.responseValue = _this2.responseEditor.getValue();
                if ((0, _XmlParser2.default)(_this2.responseEditor.getValue().trim())) {
                    _this2.setState({ validResponse: true });
                } else {
                    _this2.setState({ validResponse: false });
                }
                _this2.props.onResponseChange(_this2.responseEditor.getValue());
            });
            //debugger;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //console.log('sdfsdf',this.props.defaultRes);
            //  debugger
            if (nextProps.defaultRes) {
                //  this.responseEditor.off('change');
                this.responseEditor.setValue(nextProps.defaultRes);
                // this.responseEditor.on('change');
            }
            //  debugger
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            // console.log(this);            
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'response' },
                        'Response:'
                    ),
                    _react2.default.createElement('textarea', {
                        onChange: this.handleChange,
                        ref: function ref(input) {
                            return _this3.responseValue = input;
                        }
                        /*onChange={this.handleChange.bind(this,event)}*/
                        , className: 'form-control',
                        id: 'response'
                    })
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    this.state.validResponse ? 'Valid Response Xml' : 'Invalid Response Xml'
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);
    return Response;
}(_react.Component);

function mapStateToProps(state) {
    return {
        defaultRes: state.fetchReducer.defaultRes,
        count: state.fetchReducer.count
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps)(Response);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(CodeMirror, 'CodeMirror', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Response.js');
    reactHotLoader.register(Response, 'Response', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Response.js');
    reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Response.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/Response.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/auth/req_auth.js":
/*!*****************************************!*\
  !*** ./src/components/auth/req_auth.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _reactCookies = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");

var _reactCookies2 = _interopRequireDefault(_reactCookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var _default = function _default(ComposedComponent) {
    var Authentication = function (_Component) {
        (0, _inherits3.default)(Authentication, _Component);

        function Authentication() {
            (0, _classCallCheck3.default)(this, Authentication);
            return (0, _possibleConstructorReturn3.default)(this, (Authentication.__proto__ || (0, _getPrototypeOf2.default)(Authentication)).apply(this, arguments));
        }

        (0, _createClass3.default)(Authentication, [{
            key: 'componentWillMount',

            // static contextTypes = {
            //   router: React.PropTypes.object
            // }    
            value: function componentWillMount() {
                if (!_reactCookies2.default.load('userId')) {
                    _reactCookies2.default.save('userId', 'datta1', { path: '/' });
                    console.log("componentWillMount cookie -", _reactCookies2.default.load('userId'));
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (!_reactCookies2.default.load('userId')) {
                    _reactCookies2.default.save('userId', 'datta1', { path: '/' });
                    console.log("componentWillReceiveProps cookie -", _reactCookies2.default.load('userId'));
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(ComposedComponent, this.props);
            }
        }, {
            key: '__reactstandin__regenerateByEval',
            value: function __reactstandin__regenerateByEval(key, code) {
                this[key] = eval(code);
            }
        }]);
        return Authentication;
    }(_react.Component);

    return Authentication;
};

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/auth/req_auth.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/commonComponents/XmlParser.js":
/*!******************************************************!*\
  !*** ./src/components/commonComponents/XmlParser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var XmlParser = function XmlParser(sMyString) {
    var oParser = new DOMParser();
    try {
        var oDOM = oParser.parseFromString(sMyString, 'text/xml');
        // debugger;  
        if (oDOM.getElementsByTagName('parsererror').length > 0) {
            return false;
        }
        return true;
    } catch (error) {
        // console.log('coming feork xlmsl parser', error);
        //debugger;
        return false;
    }
};

var _default = XmlParser;
exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(XmlParser, 'XmlParser', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/commonComponents/XmlParser.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/commonComponents/XmlParser.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/header.css":
/*!***********************************!*\
  !*** ./src/components/header.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/components/header.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/components/header.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./header.css */ "./node_modules/css-loader/index.js!./src/components/header.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _simulate_form = __webpack_require__(/*! ./simulate_form */ "./src/components/simulate_form.js");

var _simulate_form2 = _interopRequireDefault(_simulate_form);

__webpack_require__(/*! ./header.css */ "./src/components/header.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var Headers = function (_Component) {
  (0, _inherits3.default)(Headers, _Component);

  function Headers() {
    (0, _classCallCheck3.default)(this, Headers);
    return (0, _possibleConstructorReturn3.default)(this, (Headers.__proto__ || (0, _getPrototypeOf2.default)(Headers)).apply(this, arguments));
  }

  (0, _createClass3.default)(Headers, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Navbar,
          null,
          _react2.default.createElement(
            _reactBootstrap.Nav,
            null,
            _react2.default.createElement(
              _reactBootstrap.NavDropdown,
              { eventKey: 3, title: 'Simulate', id: 'basic-nav-dropdown' },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: 3.1, href: '/AddRequestResponse' },
                'Add_Request-Response'
              ),
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { eventKey: 3.2, href: '/UpdateRequestResponse' },
                'Update_Request-response'
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { eventKey: 1, href: '#' },
              'Projects-UrlDetails'
            ),
            _react2.default.createElement(
              _reactBootstrap.NavItem,
              { eventKey: 2, href: '#' },
              'MyRequests'
            )
          )
        )
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);
  return Headers;
}(_react.Component);

var _default = Headers;
exports.default = _default;
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Headers, 'Headers', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/header.js');
  reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/header.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/simulate_form.css":
/*!******************************************!*\
  !*** ./src/components/simulate_form.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./simulate_form.css */ "./node_modules/css-loader/index.js!./src/components/simulate_form.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader!./simulate_form.css */ "./node_modules/css-loader/index.js!./src/components/simulate_form.css", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader!./simulate_form.css */ "./node_modules/css-loader/index.js!./src/components/simulate_form.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	})(__WEBPACK_OUTDATED_DEPENDENCIES__); });

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/components/simulate_form.js":
/*!*****************************************!*\
  !*** ./src/components/simulate_form.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _reactCookies = __webpack_require__(/*! react-cookies */ "./node_modules/react-cookies/build/cookie.js");

var _reactCookies2 = _interopRequireDefault(_reactCookies);

var _index = __webpack_require__(/*! ../actions/index */ "./src/actions/index.js");

var actions = _interopRequireWildcard(_index);

var _Request = __webpack_require__(/*! ./Request */ "./src/components/Request.js");

var _Request2 = _interopRequireDefault(_Request);

var _Response = __webpack_require__(/*! ./Response */ "./src/components/Response.js");

var _Response2 = _interopRequireDefault(_Response);

__webpack_require__(/*! ./simulate_form.css */ "./src/components/simulate_form.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var SimulateForm = function (_Component) {
    (0, _inherits3.default)(SimulateForm, _Component);

    function SimulateForm() {
        (0, _classCallCheck3.default)(this, SimulateForm);
        return (0, _possibleConstructorReturn3.default)(this, (SimulateForm.__proto__ || (0, _getPrototypeOf2.default)(SimulateForm)).apply(this, arguments));
    }

    (0, _createClass3.default)(SimulateForm, [{
        key: 'componentWillMount',

        //get the initial state from the db for release list
        //call the redux store with action to get the initial state from backend

        value: function componentWillMount() {
            // debugger;
            this.props.getReleaseData();
            //  debugger;
        }
    }, {
        key: 'onResponseChange',
        value: function onResponseChange(updatedResponse) {
            this.response = updatedResponse;
        }
    }, {
        key: 'onRequestChange',
        value: function onRequestChange(updatedRequest) {
            this.request = updatedRequest;
        }
    }, {
        key: 'handleReleaseChange',
        value: function handleReleaseChange(event) {
            //console.log(event.target.value);
            //get the project names for the selected release
            this.props.getProjectData(event.target.value);
        }
    }, {
        key: 'handleProjectChange',
        value: function handleProjectChange(event) {
            // console.log(event.target.value);
            //get the project names for the selected release
            this.props.getApiData(event.target.value);
        }
    }, {
        key: 'handleAPIChange',
        value: function handleAPIChange(event) {
            // debugger;
            this.props.getDefaultPair(this.releaseValue.value, this.projectValue.value, event.target.value);
            //  debugger;
        }

        /*      
              validRequest(validity) {
                 //  debugger;
                   if (validity) {
                      if (validity.validRequest) {
                          this.setState({ validRequest: validity.validRequest });
                      }
                      this.setState({ validRequest: validity.validRequest });
                    } 
                 // debugger;
              }
                validResponse(validity) {
                  debugger;
                  //console.log('Simulate_form_Logging',Object.keys(validity).length);
                  if (validity) {
                      if (validity.validResponse) {
                          this.setState({ validResponse: validity.validResponse });
                      }
                      this.setState({ validResponse: validity.validResponse });
                   }
                   debugger;
              }*/

    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
            var formData = {
                release: this.releaseValue.value,
                projectName: this.projectValue.value,
                apiName: this.apiValue.value,
                request: this.request,
                response: this.response,
                userId: _reactCookies2.default.load('userId')
            };
            this.props.simulateSubmit(formData);
        }
    }, {
        key: 'renderReleaseData',
        value: function renderReleaseData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.relData) {
                return this.props.relData.map(function (release) {
                    var _this2 = this;

                    return _react2.default.createElement(
                        'option',
                        { inputRef: function inputRef(ref) {
                                _this2.selectInput = ref;
                            }, key: release, value: release },
                        release
                    );
                });
            }
        }
    }, {
        key: 'renderProjectData',
        value: function renderProjectData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.projData) {
                return this.props.projData.map(function (project) {
                    return _react2.default.createElement(
                        'option',
                        { key: project, value: project },
                        project
                    );
                });
            }
        }
    }, {
        key: 'renderApiData',
        value: function renderApiData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.apiData) {
                return this.props.apiData.map(function (api) {
                    return _react2.default.createElement(
                        'option',
                        { key: api, value: api },
                        api
                    );
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            //console.log('from simulate form render method',cookie.loadAll())
            return _react2.default.createElement(
                'form',
                { className: 'submitForm', onSubmit: this.handleSubmit.bind(this) },
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'select' },
                                'Release:'
                            ),
                            _react2.default.createElement(
                                'select',
                                {
                                    className: 'form-control',
                                    id: 'release',
                                    ref: function ref(input) {
                                        return _this3.releaseValue = input;
                                    },
                                    onChange: this.handleReleaseChange.bind(this)
                                },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Release' },
                                    '--Select Release --'
                                ),
                                this.renderReleaseData()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'select' },
                                'Project:'
                            ),
                            _react2.default.createElement(
                                'select',
                                {
                                    className: 'form-control', id: 'project',
                                    ref: function ref(input) {
                                        return _this3.projectValue = input;
                                    },
                                    onChange: this.handleProjectChange.bind(this)
                                },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Project' },
                                    '--Select Project --'
                                ),
                                this.renderProjectData()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'api' },
                                'API:'
                            ),
                            _react2.default.createElement(
                                'select',
                                {
                                    className: 'form-control', id: 'api',
                                    ref: function ref(input) {
                                        return _this3.apiValue = input;
                                    },
                                    onChange: this.handleAPIChange.bind(this)
                                },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Release' },
                                    '--Select API --'
                                ),
                                this.renderApiData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(_Request2.default, {
                            onRequestChange: this.onRequestChange.bind(this)
                        })
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(_Response2.default, {
                            onResponseChange: this.onResponseChange.bind(this)

                        })
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'button',
                                (0, _defineProperty3.default)({
                                    className: 'form-control',
                                    type: 'submit'
                                }, 'className', 'btn btn-primary mb-2'),
                                'Simulate'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);
    return SimulateForm;
}(_react.Component);

function mapStateToProps(state) {
    return {
        relData: state.fetchReducer.release,
        projData: state.fetchReducer.project,
        apiData: state.fetchReducer.api
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, actions)(SimulateForm);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(SimulateForm, 'SimulateForm', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form.js');
    reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/components/simulate_form_update.js":
/*!************************************************!*\
  !*** ./src/components/simulate_form_update.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ "./node_modules/babel-runtime/helpers/defineProperty.js");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "./node_modules/babel-runtime/helpers/classCallCheck.js");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "./node_modules/babel-runtime/helpers/createClass.js");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "./node_modules/babel-runtime/helpers/inherits.js");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _index = __webpack_require__(/*! ../actions/index */ "./src/actions/index.js");

var actions = _interopRequireWildcard(_index);

var _Request = __webpack_require__(/*! ./Request */ "./src/components/Request.js");

var _Request2 = _interopRequireDefault(_Request);

var _Response = __webpack_require__(/*! ./Response */ "./src/components/Response.js");

var _Response2 = _interopRequireDefault(_Response);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var Simulate_form_Update = function (_Component) {
    (0, _inherits3.default)(Simulate_form_Update, _Component);

    function Simulate_form_Update() {
        (0, _classCallCheck3.default)(this, Simulate_form_Update);
        return (0, _possibleConstructorReturn3.default)(this, (Simulate_form_Update.__proto__ || (0, _getPrototypeOf2.default)(Simulate_form_Update)).apply(this, arguments));
    }

    (0, _createClass3.default)(Simulate_form_Update, [{
        key: 'componentWillMount',

        //get the initial state from the db for release list
        //call the redux store with action to get the initial state from backend

        value: function componentWillMount() {
            this.props.getReleaseData();
            console.log(this.props.projData);
            debugger;
            console.log('checking props passed by authentication component', this.props);
        }
    }, {
        key: 'handleReleaseChange',
        value: function handleReleaseChange(event) {
            this.props.getProjectData(event.target.value);
        }
    }, {
        key: 'handleProjectChange',
        value: function handleProjectChange(event) {
            this.props.getApiData(event.target.value);
        }
    }, {
        key: 'handleAPIChange',
        value: function handleAPIChange(event) {
            this.props.getDefaultPair(this.releaseValue.value, this.projectValue.value, event.target.value);
        }
    }, {
        key: 'onResponseChange',
        value: function onResponseChange(updatedResponse) {
            this.response = updatedResponse;
        }
    }, {
        key: 'onRequestChange',
        value: function onRequestChange(updatedRequest) {
            this.request = updatedRequest;
        }
    }, {
        key: 'renderReleaseData',
        value: function renderReleaseData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.relData) {
                return this.props.relData.map(function (release) {
                    var _this2 = this;

                    return _react2.default.createElement(
                        'option',
                        { inputRef: function inputRef(ref) {
                                _this2.selectInput = ref;
                            }, key: release, value: release },
                        release
                    );
                });
            }
        }
    }, {
        key: 'renderProjectData',
        value: function renderProjectData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.projData) {
                return this.props.projData.map(function (project) {
                    return _react2.default.createElement(
                        'option',
                        { key: project, value: project },
                        project
                    );
                });
            }
        }
    }, {
        key: 'renderApiData',
        value: function renderApiData() {
            //console.log('RELEASE SIM FORM DATA', this.props.relData);
            if (this.props.apiData) {
                return this.props.apiData.map(function (api) {
                    return _react2.default.createElement(
                        'option',
                        { key: api, value: api },
                        api
                    );
                });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            // alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
            var formData = {
                release: this.releaseValue.value,
                projectName: this.projectValue.value,
                apiName: this.apiValue.value,
                request: this.request,
                response: this.response
                // console.log('submit form response ',formData.response);
            };this.props.simulateSubmit(formData);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit.bind(this) },
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'select' },
                                'Release:'
                            ),
                            _react2.default.createElement(
                                'select',
                                {
                                    className: 'form-control',
                                    id: 'select',
                                    ref: function ref(input) {
                                        return _this3.releaseValue = input;
                                    },
                                    onChange: this.handleReleaseChange.bind(this) },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Release' },
                                    '--Select Release --'
                                ),
                                this.renderReleaseData()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'select' },
                                'Project:'
                            ),
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'project',
                                    ref: function ref(input) {
                                        return _this3.projectValue = input;
                                    },
                                    onChange: this.handleProjectChange.bind(this) },
                                '>',
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Project' },
                                    '--Select Project --'
                                ),
                                this.renderProjectData()
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 4 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'api' },
                                'API:'
                            ),
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'api',
                                    ref: function ref(input) {
                                        return _this3.apiValue = input;
                                    },
                                    onChange: this.handleAPIChange.bind(this) },
                                '>',
                                _react2.default.createElement(
                                    'option',
                                    { value: 'Release' },
                                    '--Select API --'
                                ),
                                this.renderApiData()
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(_Request2.default, { onRequestChange: this.onRequestChange.bind(this) })
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(_Response2.default, { onResponseChange: this.onResponseChange.bind(this) })
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Col,
                        { xs: 6 },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group' },
                            _react2.default.createElement(
                                'button',
                                (0, _defineProperty3.default)({ className: 'form-control', type: 'submit' }, 'className', 'btn btn-primary mb-2'),
                                'Update'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        value: function __reactstandin__regenerateByEval(key, code) {
            this[key] = eval(code);
        }
    }]);
    return Simulate_form_Update;
}(_react.Component);

function mapStateToProps(state) {
    return {
        relData: state.fetchReducer.release,
        projData: state.fetchReducer.project,
        apiData: state.fetchReducer.api
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, actions)(Simulate_form_Update);

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Simulate_form_Update, 'Simulate_form_Update', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form_update.js');
    reactHotLoader.register(mapStateToProps, 'mapStateToProps', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form_update.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/components/simulate_form_update.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/lib/index.js");

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/lib/index.js");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _routes = __webpack_require__(/*! ./routes */ "./src/routes.js");

var _routes2 = _interopRequireDefault(_routes);

var _reducers = __webpack_require__(/*! ./reducers */ "./src/reducers/index.js");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})(); //Automatically added using tranform runtime plugin added in .babelrc
//import 'babel-plugin-transform-runtime';

//import { AppContainer } from 'react-hot-loader';


var initialState = window.INITIAL_STATE;

//CRETAE A LOGGER MIDDLEWARE
var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxLogger2.default);

//APPLY LOGGER MIDDLEWARE
var createStoreWithMiddleware = (0, _redux.createStore)(_reducers2.default, initialState, middleware);

//const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore(initialState));
// const Routes = (
//     //<CookiesProvider>
//     <Provider store={createStoreWithMiddleware}>
//         <BrowserRouter>
//             {routes}
//         </BrowserRouter>
//     </Provider>
//    // </CookiesProvider>
//   );

function render(value) {
  _reactDom2.default.render(
  // <AppContainer>   
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: createStoreWithMiddleware },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      value
    )
  ),
  //  </AppContainer>, 
  document.querySelector('.container'));
}

render(_routes2.default);

// This is needed for Hot Module Replacement
if (true) {
  module.hot.accept(/*! ./routes.js */ "./src/routes.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {
    var newRoutes = __webpack_require__(/*! ./routes.js */ "./src/routes.js").default;

    render(newRoutes);
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(initialState, 'initialState', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/index.js');
  reactHotLoader.register(middleware, 'middleware', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/index.js');
  reactHotLoader.register(createStoreWithMiddleware, 'createStoreWithMiddleware', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/index.js');
  reactHotLoader.register(render, 'render', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/index.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/reducers/ParserReducer.js":
/*!***************************************!*\
  !*** ./src/reducers/ParserReducer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _types = __webpack_require__(/*! ../actions/types */ "./src/actions/types.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var _default = function _default() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _types.XML_VALID:
            return (0, _extends3.default)({}, state, { valid: action.payload });
        default:
            return state;
    }
};

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/reducers/ParserReducer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");

var _reducer = __webpack_require__(/*! ./reducer */ "./src/reducers/reducer.js");

var _reducer2 = _interopRequireDefault(_reducer);

var _ParserReducer = __webpack_require__(/*! ./ParserReducer */ "./src/reducers/ParserReducer.js");

var _ParserReducer2 = _interopRequireDefault(_ParserReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var rootReducer = (0, _redux.combineReducers)({
  fetchReducer: _reducer2.default,
  parserReducer: _ParserReducer2.default
});

var _default = rootReducer;
exports.default = _default;
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootReducer, 'rootReducer', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/reducers/index.js');
  reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/reducers/index.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/reducers/reducer.js":
/*!*********************************!*\
  !*** ./src/reducers/reducer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ "./node_modules/babel-runtime/helpers/extends.js");

var _extends3 = _interopRequireDefault(_extends2);

var _types = __webpack_require__(/*! ../../src/actions/types */ "./src/actions/types.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

    enterModule && enterModule(module);
})();

var INITIAL_STATE = {
    release: [],
    count: 0
};

var _default = function _default() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
    var action = arguments[1];

    switch (action.type) {
        case _types.GET_RELEASE:
            // console.log({...state,release:action.payload});
            return (0, _extends3.default)({}, state, { release: action.payload });
        case _types.GET_PROJECT:
            //console.log({...state,project:action.payload});
            debugger;
            return (0, _extends3.default)({}, state, { project: action.payload });
        case _types.GET_API:
            // console.log({...state,api:action.payload});
            return (0, _extends3.default)({}, state, { api: action.payload });
        case _types.DEFAULT_REQRES:
            //console.log(action.payload.request);
            debugger;
            return (0, _extends3.default)({}, state, {
                defaultReq: action.payload.request,
                defaultRes: action.payload.response,
                count: state.count + 1
            });
            debugger;
        default:
            return state;
    }
};

exports.default = _default;
;

(function () {
    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

    var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(INITIAL_STATE, 'INITIAL_STATE', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/reducers/reducer.js');
    reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/reducers/reducer.js');
    leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(/*! react */ "./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _simulate_form = __webpack_require__(/*! ../src/components/simulate_form */ "./src/components/simulate_form.js");

var _simulate_form2 = _interopRequireDefault(_simulate_form);

var _simulate_form_update = __webpack_require__(/*! ../src/components/simulate_form_update */ "./src/components/simulate_form_update.js");

var _simulate_form_update2 = _interopRequireDefault(_simulate_form_update);

var _header = __webpack_require__(/*! ../src/components/header */ "./src/components/header.js");

var _header2 = _interopRequireDefault(_header);

var _req_auth = __webpack_require__(/*! ./components/auth/req_auth */ "./src/components/auth/req_auth.js");

var _req_auth2 = _interopRequireDefault(_req_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();

var routes = _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_header2.default, null),
  _react2.default.createElement(
    _reactRouterDom.Switch,
    null,
    _react2.default.createElement(_reactRouterDom.Redirect, { from: '/', exact: true, to: '/AddRequestResponse' }),
    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/AddRequestResponse', component: (0, _req_auth2.default)(_simulate_form2.default) }),
    _react2.default.createElement(_reactRouterDom.Route, { path: '/UpdateRequestResponse', component: (0, _req_auth2.default)(_simulate_form_update2.default) })
  )
);

var _default = routes;
exports.default = _default;
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(routes, 'routes', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/routes.js');
  reactHotLoader.register(_default, 'default', 'C:/Users/dk210n/DM/ReduxSimpleStarter/src/routes.js');
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 0:
/*!***************************************************************************************************************!*\
  !*** multi babel-register react-hot-loader/patch webpack-hot-middleware/client babel-polyfill ./src/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-register */"./node_modules/babel-register/lib/browser.js");
__webpack_require__(/*! react-hot-loader/patch */"./node_modules/react-hot-loader/patch.js");
__webpack_require__(/*! webpack-hot-middleware/client */"./node_modules/webpack-hot-middleware/client.js");
__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.1ead5f1733726ea23a8a.js.map