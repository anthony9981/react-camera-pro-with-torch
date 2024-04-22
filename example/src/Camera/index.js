/* eslint-disable */
import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

function createPictureQuality(value) {
    if (value < 0 || value > 1) {
        throw new Error('Picture quality must be between 0 and 1');
    }
    return value;
}

var Wrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n"])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  ", "\n"], ["\n  width: 100%;\n  ",
    "\n"])), function (_a) {
    var aspectRatio = _a.aspectRatio;
    return aspectRatio === 'cover'
        ? "\n    position: absolute;\n    bottom: 0;\n    top: 0;\n    left: 0;\n    right: 0;"
        : "\n    position: relative;\n    padding-bottom: " + 100 / aspectRatio + "%;";
});
var ErrorMsg = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 40px;\n"], ["\n  padding: 40px;\n"])));
var Cam = styled.video(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 0;\n  transform: rotateY(", ");\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 0;\n  transform: rotateY(", ");\n"])), function (_a) {
    var mirrored = _a.mirrored;
    return (mirrored ? '180deg' : '0deg');
});
var Canvas = styled.canvas(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

var Camera = React.forwardRef(function (_a, ref) {
    var _b = _a.facingMode, facingMode = _b === void 0 ? 'front' : _b, _c = _a.aspectRatio, aspectRatio = _c === void 0 ? 'cover' : _c, 
    // numberOfCamerasCallback = () => null,
    _d = _a.numberOfFrontCamerasCallback, 
    // numberOfCamerasCallback = () => null,
    numberOfFrontCamerasCallback = _d === void 0 ? function () { return null; } : _d, _e = _a.numberOfBackCamerasCallback, numberOfBackCamerasCallback = _e === void 0 ? function () { return null; } : _e, _f = _a.pictureQuality, pictureQuality = _f === void 0 ? 0.9 : _f, _g = _a.errorMessages, errorMessages = _g === void 0 ? {
        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
        switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
        canvas: 'Canvas is not supported.',
    } : _g, _h = _a.videoReadyCallback, videoReadyCallback = _h === void 0 ? function () { return null; } : _h;
    var player = useRef(null);
    var canvas = useRef(null);
    var container = useRef(null);
    // const [numberOfCameras, setNumberOfCameras] = useState<number>(0);
    var _j = useState(0), numberOffrontCameras = _j[0], setNumberOfFrontCameras = _j[1];
    var _k = useState(0), numberOfbackCameras = _k[0], setNumberOfBackCameras = _k[1];
    var _l = useState(null), stream = _l[0], setStream = _l[1];
    var _m = useState(facingMode), currentFacingMode = _m[0], setFacingMode = _m[1];
    var _o = useState(false), notSupported = _o[0], setNotSupported = _o[1];
    var _p = useState(false), permissionDenied = _p[0], setPermissionDenied = _p[1];
    var _q = useState(false), torchsupported = _q[0], setTorchSupported = _q[1];
    var _r = useState(false), isTorchOn = _r[0], setTorchOnOff = _r[1];
    var _s = useState([]), frontCameras = _s[0], setFrontCameras = _s[1];
    var _t = useState([]), backCameras = _t[0], setBackCameras = _t[1];
    var _u = useState(undefined), activeDeviceId = _u[0], setActiveDeviceId = _u[1];
    var torchSupportedRef = useRef(false);
    useEffect(function () {
        numberOfFrontCamerasCallback(numberOffrontCameras);
    }, [numberOffrontCameras]);
    useEffect(function () {
        numberOfBackCamerasCallback(numberOfbackCameras);
    }, [numberOfbackCameras]);
    useImperativeHandle(ref, function () { return ({
        takePhoto: function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (facingMode === 'front') {
                if (numberOffrontCameras < 1) {
                    throw new Error(errorMessages.noCameraAccessible);
                }
                if (canvas === null || canvas === void 0 ? void 0 : canvas.current) {
                    var playerWidth = ((_a = player === null || player === void 0 ? void 0 : player.current) === null || _a === void 0 ? void 0 : _a.videoWidth) || 1280;
                    var playerHeight = ((_b = player === null || player === void 0 ? void 0 : player.current) === null || _b === void 0 ? void 0 : _b.videoHeight) || 720;
                    var playerAR = playerWidth / playerHeight;
                    var canvasWidth = ((_c = container === null || container === void 0 ? void 0 : container.current) === null || _c === void 0 ? void 0 : _c.offsetWidth) || 1280;
                    var canvasHeight = ((_d = container === null || container === void 0 ? void 0 : container.current) === null || _d === void 0 ? void 0 : _d.offsetHeight) || 1280;
                    var canvasAR = canvasWidth / canvasHeight;
                    var sX = void 0, sY = void 0, sW = void 0, sH = void 0;
                    if (playerAR > canvasAR) {
                        sH = playerHeight;
                        sW = playerHeight * canvasAR;
                        sX = (playerWidth - sW) / 2;
                        sY = 0;
                    }
                    else {
                        sW = playerWidth;
                        sH = playerWidth / canvasAR;
                        sX = 0;
                        sY = (playerHeight - sH) / 2;
                    }
                    canvas.current.width = sW;
                    canvas.current.height = sH;
                    var context = canvas.current.getContext('2d');
                    if (context && (player === null || player === void 0 ? void 0 : player.current)) {
                        context.drawImage(player.current, sX, sY, sW, sH, 0, 0, sW, sH);
                    }
                    var quality = createPictureQuality(0.8);
                    var imgData = canvas.current.toDataURL('image/jpeg', quality);
                    return imgData;
                }
                else {
                    throw new Error(errorMessages.canvas);
                }
            }
            else {
                if (numberOfbackCameras < 1) {
                    throw new Error(errorMessages.noCameraAccessible);
                }
                if (canvas === null || canvas === void 0 ? void 0 : canvas.current) {
                    var playerWidth = ((_e = player === null || player === void 0 ? void 0 : player.current) === null || _e === void 0 ? void 0 : _e.videoWidth) || 1280;
                    var playerHeight = ((_f = player === null || player === void 0 ? void 0 : player.current) === null || _f === void 0 ? void 0 : _f.videoHeight) || 720;
                    var playerAR = playerWidth / playerHeight;
                    var canvasWidth = ((_g = container === null || container === void 0 ? void 0 : container.current) === null || _g === void 0 ? void 0 : _g.offsetWidth) || 1280;
                    var canvasHeight = ((_h = container === null || container === void 0 ? void 0 : container.current) === null || _h === void 0 ? void 0 : _h.offsetHeight) || 1280;
                    var canvasAR = canvasWidth / canvasHeight;
                    var sX = void 0, sY = void 0, sW = void 0, sH = void 0;
                    if (playerAR > canvasAR) {
                        sH = playerHeight;
                        sW = playerHeight * canvasAR;
                        sX = (playerWidth - sW) / 2;
                        sY = 0;
                    }
                    else {
                        sW = playerWidth;
                        sH = playerWidth / canvasAR;
                        sX = 0;
                        sY = (playerHeight - sH) / 2;
                    }
                    canvas.current.width = sW;
                    canvas.current.height = sH;
                    var context = canvas.current.getContext('2d');
                    if (context && (player === null || player === void 0 ? void 0 : player.current)) {
                        context.drawImage(player.current, sX, sY, sW, sH, 0, 0, sW, sH);
                    }
                    var quality = createPictureQuality(pictureQuality);
                    var imgData = canvas.current.toDataURL('image/jpeg', quality);
                    return imgData;
                }
                else {
                    throw new Error(errorMessages.canvas);
                }
            }
        },
        switchCamera: function () {
            if (facingMode === 'front') {
                if (numberOffrontCameras < 1) {
                    throw new Error(errorMessages.noCameraAccessible);
                }
                else if (numberOffrontCameras < 2) {
                    console.error('Error: Unable to switch camera. Only one device is accessible.'); // console only
                }
                togglebetweencameras('front');
                console.log('Is Torch supported?: ', torchSupportedRef.current);
                return torchsupported;
            }
            else {
                if (numberOfbackCameras < 1) {
                    throw new Error(errorMessages.noCameraAccessible);
                }
                else if (numberOfbackCameras < 2) {
                    console.error('Error: Unable to switch camera. Only one device is accessible.'); // console only
                }
                togglebetweencameras('back');
                console.log('Is Torch supported?: ', torchSupportedRef.current);
                return torchsupported;
            }
        },
        toggleTorch: function () {
            var currentTrack = (stream === null || stream === void 0 ? void 0 : stream.getVideoTracks()[0]) || (stream === null || stream === void 0 ? void 0 : stream.getTracks()[0]);
            if (torchsupported) {
                var torchValue = isTorchOn ? false : true;
                currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.applyConstraints({
                    advanced: [{ torch: torchValue }],
                });
                setTorchOnOff(torchValue);
            }
            else {
                console.log('Torch not supported');
            }
        },
        flashStatus: function () {
            return torchsupported;
        },
    }); });
    function togglebetweencameras(frontback) {
        if (frontback === 'front') {
            console.log('Hello! I am in front.');
            setActiveDeviceId(function (prevCameraId) {
                var _a, _b;
                var currentIndex = frontCameras.findIndex(function (device) { return device.deviceId === prevCameraId; });
                console.log(currentIndex);
                console.log(frontCameras);
                if (currentIndex < 0) {
                    var nextIndex = Math.abs(currentIndex);
                    return ((_a = frontCameras[nextIndex]) === null || _a === void 0 ? void 0 : _a.deviceId) || '';
                }
                else {
                    var nextIndex = (currentIndex + 1) % frontCameras.length;
                    return ((_b = frontCameras[nextIndex]) === null || _b === void 0 ? void 0 : _b.deviceId) || '';
                }
            });
        }
        else {
            console.log('Hello! I am in back.');
            setActiveDeviceId(function (prevCameraId) {
                var _a, _b;
                var currentIndex = backCameras.findIndex(function (device) { return device.deviceId === prevCameraId; });
                console.log(currentIndex);
                console.log(backCameras);
                if (currentIndex < 0) {
                    var nextIndex = Math.abs(currentIndex);
                    return ((_a = backCameras[nextIndex]) === null || _a === void 0 ? void 0 : _a.deviceId) || '';
                }
                else {
                    var nextIndex = (currentIndex + 1) % backCameras.length;
                    return ((_b = backCameras[nextIndex]) === null || _b === void 0 ? void 0 : _b.deviceId) || '';
                }
            });
        }
    }
    useEffect(function () {
        torchSupportedRef.current = torchsupported;
    }, [torchsupported]);
    useEffect(function () {
        initCameraStream(stream, setStream, facingMode, activeDeviceId, setNumberOfFrontCameras, setNumberOfBackCameras, setNotSupported, setPermissionDenied, setTorchSupported, setTorchOnOff, setFrontCameras, setBackCameras);
    }, [facingMode, activeDeviceId]);
    useEffect(function () {
        if (stream && player && player.current) {
            player.current.srcObject = stream;
        }
        return function () {
            if (stream) {
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
        };
    }, [stream]);
    return (React.createElement(Container, { ref: container, aspectRatio: aspectRatio },
        React.createElement(Wrapper, null,
            notSupported ? React.createElement(ErrorMsg, null, errorMessages.noCameraAccessible) : null,
            permissionDenied ? React.createElement(ErrorMsg, null, errorMessages.permissionDenied) : null,
            React.createElement(Cam, { ref: player, id: "video", muted: true, autoPlay: true, playsInline: true, mirrored: currentFacingMode === 'front' ? true : false, onLoadedData: function () {
                    videoReadyCallback();
                } }),
            React.createElement(Canvas, { ref: canvas }))));
});
Camera.displayName = 'Camera';
var initCameraStream = function (stream, setStream, currentFacingMode, videoSourceDeviceId, setNumberOfFrontCameras, setNumberOfBackCameras, setNotSupported, setPermissionDenied, setTorchSupported, setTorchOnOff, setFrontCameras, setBackCameras) {
    var _a;
    // stop any active streams in the window
    if (stream) {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    var constraints = {
        audio: false,
        video: {
            deviceId: videoSourceDeviceId ? { exact: videoSourceDeviceId } : undefined,
            facingMode: currentFacingMode === 'front' ? 'user' : 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1920 },
        },
    };
    if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) { return __awaiter(void 0, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, checkTorchExists(navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices, stream)];
                    case 1:
                        result = _b.sent();
                        setTorchSupported(result);
                        setTorchOnOff(result);
                        _a = setStream;
                        return [4 /*yield*/, handleSuccess(stream, setNumberOfFrontCameras, setNumberOfBackCameras, setFrontCameras, setBackCameras)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]);
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            handleError(err, setNotSupported, setPermissionDenied);
        });
    }
    else {
        var getWebcam_1 = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (getWebcam_1) {
            getWebcam_1(constraints, function (stream) { return __awaiter(void 0, void 0, void 0, function () {
                var result, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, checkTorchExists(getWebcam_1, stream)];
                        case 1:
                            result = _b.sent();
                            setTorchSupported(result);
                            setTorchOnOff(result);
                            _a = setStream;
                            return [4 /*yield*/, handleSuccess(stream, setNumberOfFrontCameras, setNumberOfBackCameras, setFrontCameras, setBackCameras)];
                        case 2:
                            _a.apply(void 0, [_b.sent()]);
                            return [2 /*return*/];
                    }
                });
            }); }, function (err) {
                handleError(err, setNotSupported, setPermissionDenied);
            });
        }
        else {
            setNotSupported(true);
        }
    }
};
var handleSuccess = function (stream, setNumberOfFrontCameras, setNumberOfBackCameras, setFrontCameras, setBackCameras) { return __awaiter(void 0, void 0, void 0, function () {
    var devices, videoDevices, numberOfCameras, frontDevices, backDevices, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, navigator.mediaDevices.enumerateDevices()];
            case 1:
                devices = _a.sent();
                videoDevices = devices.filter(function (device) { return device.kind === 'videoinput' || 'video'; });
                numberOfCameras = videoDevices.length;
                frontDevices = videoDevices.filter(function (device) {
                    return device.label.toLowerCase().includes('front');
                });
                if (numberOfCameras > 0 && frontDevices.length === 0) {
                    frontDevices.push(videoDevices[0]);
                }
                setFrontCameras(frontDevices);
                setNumberOfFrontCameras(frontDevices.length);
                backDevices = videoDevices.filter(function (device) {
                    return device.label.toLowerCase().includes('back');
                });
                if (numberOfCameras > 0 && backDevices.length === 0) {
                    backDevices.push(videoDevices[1]);
                }
                setBackCameras(backDevices);
                setNumberOfBackCameras(backDevices.length);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error enumerating devices:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, stream];
        }
    });
}); };
function checkTorchExists(device, stream) {
    return __awaiter(this, void 0, void 0, function () {
        var supportedConstraints, track, error_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    supportedConstraints = device === null || device === void 0 ? void 0 : device.getSupportedConstraints();
                    track = stream.getTracks()[0];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    if (!(supportedConstraints && 'torch' in supportedConstraints && track && track.applyConstraints)) return [3 /*break*/, 6];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, track.applyConstraints({ advanced: [{ torch: false }] })];
                case 3:
                    _b.sent();
                    console.log("Torch constraint is supported.");
                    return [2 /*return*/, true];
                case 4:
                    error_2 = _b.sent();
                    console.log("Torch constraint is not supported.");
                    return [2 /*return*/, false];
                case 5: return [3 /*break*/, 7];
                case 6:
                    console.log("Torch constraint is not supported.");
                    return [2 /*return*/, false];
                case 7: return [3 /*break*/, 9];
                case 8:
                    _a = _b.sent();
                    console.log("Torch constraint is not supported.");
                    return [2 /*return*/, false];
                case 9: return [2 /*return*/];
            }
        });
    });
}
var handleError = function (error, setNotSupported, setPermissionDenied) {
    console.error(error);
    //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (error.name === 'PermissionDeniedError') {
        setPermissionDenied(true);
    }
    else {
        setNotSupported(true);
    }
};

export { Camera };
