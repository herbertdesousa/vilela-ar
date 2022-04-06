import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const documentRefPlaceDeviceBrand: Prisma.DocumentRefPlaceDeviceBrandCreateInput[] =
  [
    {
      name: 'Samsung',
    },
    {
      name: 'Fujitsu',
    },
    {
      name: 'LG',
    },
    {
      name: 'Midea',
    },
    {
      name: 'Carrier',
    },
    {
      name: 'Elgin',
    },
    {
      name: 'Gree',
    },
    {
      name: 'Hitachi',
    },
    {
      name: 'Springer',
    },
    {
      name: 'Daikin',
    },
    {
      name: 'Consul',
    },
    {
      name: 'Komeco',
    },
    {
      name: 'Fontaine',
    },
  ];
const documentRefPlaceDeviceCapacity: Prisma.DocumentRefPlaceDeviceCapacityCreateInput[] =
  [
    {
      name: '7.000BTUS',
    },
    {
      name: '9.000BTUS',
    },
    {
      name: '12.000BTUS',
    },
    {
      name: '15.000BTUS',
    },
    {
      name: '16.000BTUS',
    },
    {
      name: '18.000BTUS',
    },
    {
      name: '21.000BTUS',
    },
    {
      name: '24.000BTUS',
    },
    {
      name: '27.000BTUS',
    },
    {
      name: '28.000BTUS',
    },
    {
      name: '30.000BTUS',
    },
    {
      name: '32.000BTUS',
    },
    {
      name: '36.000BTUS',
    },
    {
      name: '40.000BTUS',
    },
    {
      name: '42.000BTUS',
    },
    {
      name: '48.000BTUS',
    },
    {
      name: '56.000BTUS',
    },
  ];
const documentRefPlaceDeviceMode: Prisma.DocumentRefPlaceDeviceModeCreateInput[] =
  [
    {
      name: 'Split Cassete(K7) 1 via',
    },
    {
      name: 'Split Cassete(K7) 4 vias',
    },
    {
      name: 'Split',
    },
    {
      name: 'Split Hi-Wall',
    },
    {
      name: 'Split Piso-Teto',
    },
    {
      name: 'Split Quatro-Lados',
    },
    {
      name: 'Split Canto-Teto',
    },
    {
      name: 'Split Inverter',
    },
    {
      name: 'Split Janela',
    },
    {
      name: 'Portátil',
    },
    {
      name: 'VRF',
    },
  ];
const documentRefPlaceRoom: Prisma.DocumentRefPlaceRoomCreateInput[] = [
  {
    name: 'Sacada',
  },
  {
    name: 'Suite I',
  },
  {
    name: 'Suite II',
  },
  {
    name: 'Suite III',
  },
  {
    name: 'Quarto de Hóspede',
  },
];
const documentRefPlaceFloor: Prisma.DocumentRefPlaceFloorCreateInput[] = [
  {
    name: 'Pavimento I',
  },
  {
    name: 'Pavimento II',
  },
  {
    name: 'Térreo',
  },
  {
    name: 'Primeiro Andar',
  },
  {
    name: 'Segundo Andar',
  },
];
const documentRefMaterialItem: Prisma.DocumentRefMaterialItemCreateInput[] = [
  {
    name: 'Cano de cobre',
  },
  {
    name: 'Isolamento térmico',
  },
  {
    name: 'Caixa de infra',
  },
  {
    name: 'Cabo pp(4 vias)',
  },
  {
    name: 'Cano(pvc)',
  },
  {
    name: 'Conexões(pvc)',
  },
  {
    name: 'Silver tape',
  },
  {
    name: 'Buchas',
  },
  {
    name: 'Abraçadeiras',
  },
  {
    name: 'Parafusos',
  },
  {
    name: 'Pés de borracha',
  },
  {
    name: 'Carga de gás',
  },
  {
    name: 'Bomba de vácuo',
  },
  {
    name: 'Nitrogênio',
  },
  {
    name: 'Suporte de condensadora',
  },
];
const documentRef = {
  documentRefPlaceDeviceBrand,
  documentRefPlaceDeviceCapacity,
  documentRefPlaceDeviceMode,
  documentRefPlaceRoom,
  documentRefPlaceFloor,
  documentRefMaterialItem,
};

async function main() {
  console.log('Seeding...');

  // DocumentRefs
  await Promise.all([
    Object.entries(documentRef).map(async ([key, value]) => {
      await prisma[key].createMany({ data: value });
    }),
  ]);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
