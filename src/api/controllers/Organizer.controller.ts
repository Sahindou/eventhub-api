import { Request, Response, NextFunction } from 'express';
import { RegisterOrganizerUseCase } from '@/application/usecases/RegisterOrganizerUseCase';
import { LoginOrganizerUseCase } from '@/application/usecases/LoginOrganizerUseCase';

export class OrganizerController {
  constructor(
    private readonly registerOrganizerUseCase: RegisterOrganizerUseCase,
    private readonly loginOrganizerUseCase: LoginOrganizerUseCase
  ) {}

  // POST /api/organizers/register
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = {
        // Données User
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        profile_image: req.body.profile_image || null,
        // Données Organizer
        company_name: req.body.company_name,
        siret: req.body.siret,
        description: req.body.description,
      };

      const result = await this.registerOrganizerUseCase.execute(dto);

      res.jsonSuccess({
        userId: result.userId,
        organizerId: result.organizerId,
      }, 201)

    } catch (error) {
      next(error);
    }
  }

  // POST /api/organizers/login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = {
        email: req.body.email,
        password: req.body.password,
      };

      const result = await this.loginOrganizerUseCase.execute(dto);

      res.jsonSuccess({
        token: result.token,
        user: result.user,
      });

    } catch (error) {
      next(error);
    }
  }
}
