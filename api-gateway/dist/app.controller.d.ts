import type { Request, Response } from 'express';
export declare class AppController {
    constructor();
    private userServiceProxy;
    private generalServiceProxy;
    private financeServiceProxy;
    private fileServiceProxy;
    private authServiceProxy;
    authProxy(req: Request, res: Response): void;
    userServiceRoute(req: Request, res: Response): void;
    generalServiceRoute(req: Request, res: Response): void;
    financeServiceRoute(req: Request, res: Response): void;
    fileServiceRoute(req: Request, res: Response): void;
}
