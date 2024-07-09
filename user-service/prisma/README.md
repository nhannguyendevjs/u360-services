# Prisma

## Initial

npm install prisma --save-dev

npx prisma init --datasource-provider postgresql

npx prisma -v

npx prisma generate --schema prisma/schema/schema.prisma

npx prisma db pull --force

npx prisma db push --schema prisma/schema

npx prisma studio
