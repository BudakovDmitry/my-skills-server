import { AdminJSOptions } from 'adminjs';
import { componentLoader, Components } from './component-loader.js';
import { getModelByName } from '@adminjs/prisma';
import { PrismaService } from '../prisma.service.js';

const prisma = new PrismaService()

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [{
    resource: { model: getModelByName('User'), client: prisma },
    options: {
      properties: {
        todos: {
          type: 'array',
          isVisible: { list: true, filter: true, show: true, edit: true },
        },
      },
    },
  },
  {
    resource: { model: getModelByName('Page'), client: prisma },
    options: {
      properties: {
        content: {
          type: 'richtext',
          // components: {
          //   edit: Components.CKEditor, 
          // },
        }
      }
    }
  },
  {
    resource: { model: getModelByName('PageLink'), client: prisma },
    options: {},
  },
  {
    resource: { model: getModelByName('Todo'), client: prisma },
    options: {
      properties: {
        userId: {
          reference: 'User',
          isVisible: { list: true, filter: true, show: true, edit: true },
        },
      },
    },
  },
  ],
  databases: [],
};

export default options;
