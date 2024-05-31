import { AdminJSOptions } from 'adminjs';
import componentLoader from './component-loader.js';
import { getModelByName } from '@adminjs/prisma';
import { PrismaService } from '../prisma.service.js';

const prisma = new PrismaService()

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [{
    resource: { model: getModelByName('User'), client: prisma },
    options: {},
  },
  {
    resource: { model: getModelByName('Page'), client: prisma },
    options: {
      properties: {
        content: {
          type: 'richtext',
        }
      }
    }
  }],
  databases: [],
};

export default options;
