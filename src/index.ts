async function main (): Promise<any> {
  console.log('entrou')
}

main()
  .then((result) => {
    console.log(result, 'a')
  })
  .catch((err) => {
    console.log(err, 'a')
  })
