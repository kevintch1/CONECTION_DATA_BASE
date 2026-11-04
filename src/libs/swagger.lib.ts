import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API de Restaurante',
        description: 'Documentación automática generada por Kevinchotech',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = 'swagger-output.json';

const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('../index.js');
});