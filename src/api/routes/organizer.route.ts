import { Router } from "express";
import { OrganizerController } from '@/api/controllers/';
import { RegisterOrganizerUseCase } from '@/application/usecases/RegisterOrganizerUseCase';
import { LoginOrganizerUseCase } from '@/application/usecases/LoginOrganizerUseCase';
import { UserRepositoryDatabase } from '@/infrastructure/repositories/UserRepositoryDatabase';
import { OrganizerRepositoryDatabase } from '@/infrastructure/repositories/OrganizerRepositoryDatabase';
import { UuidGenerator } from '@/infrastructure/id-generators/UuidGenerator';
import { BcryptPasswordHasher } from '@/infrastructure/services/BcryptPasswordHasher';
import { JwtTokenGenerator } from '@/infrastructure/services/JwtTokenGenerator';

const router = Router();

// 1. Créer les dépendances
const userRepository = new UserRepositoryDatabase();
const organizerRepository = new OrganizerRepositoryDatabase();
const idGenerator = new UuidGenerator();
const passwordHasher = new BcryptPasswordHasher();
const tokenGenerator = new JwtTokenGenerator(process.env.JWT_SECRET || 'your-secret-key');

// 2. Créer les Use Cases
const registerOrganizerUseCase = new RegisterOrganizerUseCase(
  userRepository,
  organizerRepository,
  idGenerator,
  passwordHasher
);

const loginOrganizerUseCase = new LoginOrganizerUseCase(
  userRepository,
  passwordHasher,
  tokenGenerator
);

// 3. Créer le Controller
const organizerController = new OrganizerController(
  registerOrganizerUseCase,
  loginOrganizerUseCase
);

// ===== DÉFINIR LES ROUTES =====

// POST /api/organizers/register - Enregistrer un organisateur (crée User + Organizer)
router.post('/register', organizerController.register.bind(organizerController));

// POST /api/organizers/login - Connecter un organisateur
router.post('/login', organizerController.login.bind(organizerController));

export { router as OrganizerRouter };
