"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const http_proxy_middleware_1 = require("http-proxy-middleware");
const public_decorator_1 = require("./common/decorators/public.decorator");
let AppController = class AppController {
    constructor() {
        console.log("🔥 AppController loaded!");
    }
    userServiceProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.USER_SERVICE_URL || 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
            '^/userservice': '',
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', req.user._id);
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }
            },
        },
    });
    generalServiceProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.GENERAL_SERVICE_URL || 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/generalservice': '',
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', req.user._id);
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }
            },
        },
    });
    financeServiceProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.FINANCE_SERVICE_URL || 'http://localhost:3002',
        changeOrigin: true,
        pathRewrite: {
            '^/financeservice': '',
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', req.user._id);
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }
            },
        },
    });
    fileServiceProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.FILE_SERVICE_URL || 'http://localhost:3003',
        changeOrigin: true,
        pathRewrite: {
            '^/fileservice': '',
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader('x-user-id', req.user._id);
                    proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
                }
            },
        },
    });
    authServiceProxy = (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: process.env.GENERAL_SERVICE_URL || 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/auth': '',
        },
        logLevel: 'debug',
    });
    authProxy(req, res) {
        console.log("🔥 /auth/* hit:", req.url);
        this.authServiceProxy(req, res, (err) => {
            if (err) {
                console.error('Auth proxy error:', err);
            }
        });
    }
    userServiceRoute(req, res) {
        this.userServiceProxy(req, res, (err) => {
            if (err) {
                console.error('User service proxy error:', err);
            }
        });
    }
    generalServiceRoute(req, res) {
        this.generalServiceProxy(req, res, (err) => {
            if (err) {
                console.error('General service proxy error:', err);
            }
        });
    }
    financeServiceRoute(req, res) {
        this.financeServiceProxy(req, res, (err) => {
            if (err) {
                console.error('Finance service proxy error:', err);
            }
        });
    }
    fileServiceRoute(req, res) {
        this.fileServiceProxy(req, res, (err) => {
            if (err) {
                console.error('File service proxy error:', err);
            }
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.All)('/auth/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "authProxy", null);
__decorate([
    (0, common_1.All)('/userservice/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "userServiceRoute", null);
__decorate([
    (0, common_1.All)('/generalservice/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "generalServiceRoute", null);
__decorate([
    (0, common_1.All)('/financeservice/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "financeServiceRoute", null);
__decorate([
    (0, common_1.All)('/fileservice/*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "fileServiceRoute", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [])
], AppController);
//# sourceMappingURL=app.controller.js.map