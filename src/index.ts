async function main (): Promise<any> {
  console.log('entrou')
}

main()
  .then((result) => {
    console.log(result, 'b')
  })
  .catch((err) => {
    console.log(err, 'b')
  })
