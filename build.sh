rm -r ./dist
rm -rf node_modules
npm install -production --legacy-peer-deps

npm run prisma:migrate

tsc --skipLibCheck --project ./
echo build typescript

rm -r ./dist/presentation
echo remove folder presentation

cp -R ./src/presentation/ ./dist/presentation/
echo copy presentation to dist

resultado_ls1=$(ls './dist')
resultado_ls2=$(ls './dist/src')

echo $(pwd)
echo "==> Lista de arquivos e diretórios:"
echo "$resultado_ls1"
echo "==> Lista de arquivos e diretórios:"
echo "$resultado_ls2"