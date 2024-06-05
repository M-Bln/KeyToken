(self["webpackChunkui_confidential_erc1155"] = self["webpackChunkui_confidential_erc1155"] || []).push([["src_connect-to-network_create-fhevm-instance_ts"],{

/***/ "./src/connect-to-network/create-fhevm-instance.ts":
/*!*********************************************************!*\
  !*** ./src/connect-to-network/create-fhevm-instance.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FHE_LIB_ADDRESS: () => (/* binding */ FHE_LIB_ADDRESS),
/* harmony export */   createFhevmInstance: () => (/* binding */ createFhevmInstance)
/* harmony export */ });
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "./node_modules/ethers/lib.esm/abi/abi-coder.js");
/* harmony import */ var fhevmjs_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fhevmjs/web */ "./node_modules/fhevmjs/lib/web.js");


const FHE_LIB_ADDRESS = '0x000000000000000000000000000000000000005d';
const createFhevmInstance = async (contractAddress, account, provider) => {
    const network = await provider.getNetwork();
    const chainId = +network.chainId.toString();
    const ret = await provider.call({
        // fhe lib address, may need to be changed depending on network
        to: '0x000000000000000000000000000000000000005d',
        // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
        data: '0xd9d47bb001',
    });
    const decoded = ethers__WEBPACK_IMPORTED_MODULE_1__.AbiCoder.defaultAbiCoder().decode(['bytes'], ret);
    const publicKey = decoded[0];
    await (0,fhevmjs_web__WEBPACK_IMPORTED_MODULE_0__.initFhevm)(); // Load TFHE
    return (0,fhevmjs_web__WEBPACK_IMPORTED_MODULE_0__.createInstance)({ chainId: chainId, publicKey });
};


/***/ }),

/***/ "?d546":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8131":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3fc0":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?4068":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e7e4":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?7bec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?f0f8":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ebe9":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?0aec":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?fbf1":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ed1b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d17e":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3e83":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?19e6":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=src_connect-to-network_create-fhevm-instance_ts.main.js.map