"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderTree = void 0;
var _root_1 = require("@root");
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var FolderTree = /** @class */ (function () {
    function FolderTree(providedPath, extensions) {
        this.data = this.createFolderTree(providedPath, extensions);
        (0, _root_1.autoBind)(this);
    }
    FolderTree.prototype.createFolderTree = function (providedPath, extensions) {
        try {
            var resolvedPath = node_path_1.default.resolve(import.meta.dirname, providedPath);
            var currentStats = node_fs_1.default.statSync(resolvedPath);
            var tree = this.createEmptyFolder('', resolvedPath);
            if (currentStats.isDirectory()) {
                tree.name = node_path_1.default.basename(resolvedPath);
            }
            this.fillFolder(resolvedPath, tree, extensions);
            return tree;
        }
        catch (error) {
            return null;
        }
    };
    FolderTree.prototype.createEmptyFolder = function (name, path) {
        return {
            type: 'folder',
            files: [],
            folders: [],
            name: name,
            path: path,
        };
    };
    FolderTree.prototype.fillFolder = function (currentPath, folder, extensions) {
        var _this = this;
        var files = node_fs_1.default.readdirSync(currentPath);
        files.forEach(function (fileName) {
            var filePath = node_path_1.default.join(currentPath, fileName);
            var stat = node_fs_1.default.statSync(filePath);
            var validExtension = (extensions
                ? extensions.some(function (ext) { return fileName.endsWith(ext); })
                : true);
            if (stat.isFile() && validExtension) {
                var fileData = node_fs_1.default.readFileSync(filePath);
                folder.files.push({
                    data: fileData,
                    name: fileName,
                    type: 'file',
                    path: filePath,
                });
            }
            if (stat.isDirectory()) {
                var newFolder = _this.createEmptyFolder(fileName, filePath);
                folder.folders.push(newFolder);
                _this.fillFolder(filePath, newFolder, extensions);
            }
        });
    };
    FolderTree.prototype.traverseFolder = function (folder, cb) {
        var _this = this;
        cb(folder);
        folder.files.forEach(cb);
        folder.folders.forEach(function (_folder) {
            _this.traverseFolder(_folder, cb);
        });
    };
    FolderTree.prototype.traverse = function (cb) {
        if (!this.data)
            return;
        this.traverseFolder(this.data, cb);
    };
    FolderTree.prototype.isEmpty = function () {
        var _a, _b, _c;
        return !((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.files.length) !== null && _b !== void 0 ? _b : (_c = this.data) === null || _c === void 0 ? void 0 : _c.folders.length);
    };
    FolderTree.prototype.getDataWithoutBuffer = function () {
        if (!this.data)
            return this.data;
        var folder = structuredClone(this.data);
        this.traverseFolder(folder, function (fileOrFolder) {
            if (fileOrFolder.type !== 'file')
                return;
            fileOrFolder.data = Buffer.from('');
        });
        return folder;
    };
    return FolderTree;
}());
exports.FolderTree = FolderTree;
