import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {
    console.log("🔥 AppController loaded!");
  }
  private userServiceProxy = createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: {
      '^/userservice': '',
    },
    on: {
      proxyReq: (proxyReq, req: any) => {
        if (req.user) {
          proxyReq.setHeader('x-user-id', req.user._id);
          proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
        }
      },
    },
  } as any);

  private generalServiceProxy = createProxyMiddleware({
    target: process.env.GENERAL_SERVICE_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/generalservice': '',
    },
    on: {
      proxyReq: (proxyReq, req: any) => {
        if (req.user) {
          proxyReq.setHeader('x-user-id', req.user._id);
          proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
        }
      },
    },
  } as any);

  private financeServiceProxy = createProxyMiddleware({
    target: process.env.FINANCE_SERVICE_URL || 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
      '^/financeservice': '',
    },
    on: {
      proxyReq: (proxyReq, req: any) => {
        if (req.user) {
          proxyReq.setHeader('x-user-id', req.user._id);
          proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
        }
      },
    },
  } as any);

  private fileServiceProxy = createProxyMiddleware({
    target: process.env.FILE_SERVICE_URL || 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
      '^/fileservice': '',
    },
    on: {
      proxyReq: (proxyReq, req: any) => {
        if (req.user) {
          proxyReq.setHeader('x-user-id', req.user._id);
          proxyReq.setHeader('x-user-data', JSON.stringify(req.user));
        }
      },
    },
  } as any);

  private authServiceProxy = createProxyMiddleware({
    target: process.env.GENERAL_SERVICE_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/auth': '',
    },
    logLevel: 'debug',
  } as any);

  @Public()
  @All('/auth/*')
  authProxy(@Req() req: Request, @Res() res: Response) {
    console.log("🔥 /auth/* hit:", req.url);
    this.authServiceProxy(req as any, res as any, (err) => {
      if (err) {
        console.error('Auth proxy error:', err);
      }
    });
  }

  @All('/userservice/*')
  userServiceRoute(@Req() req: Request, @Res() res: Response) {
    this.userServiceProxy(req as any, res as any, (err) => {
      if (err) {
        console.error('User service proxy error:', err);
      }
    });
  }

  @All('/generalservice/*')
  generalServiceRoute(@Req() req: Request, @Res() res: Response) {
    this.generalServiceProxy(req as any, res as any, (err) => {
      if (err) {
        console.error('General service proxy error:', err);
      }
    });
  }

  @All('/financeservice/*')
  financeServiceRoute(@Req() req: Request, @Res() res: Response) {
    this.financeServiceProxy(req as any, res as any, (err) => {
      if (err) {
        console.error('Finance service proxy error:', err);
      }
    });
  }

  @All('/fileservice/*')
  fileServiceRoute(@Req() req: Request, @Res() res: Response) {
    this.fileServiceProxy(req as any, res as any, (err) => {
      if (err) {
        console.error('File service proxy error:', err);
      }
    });
  }
}
