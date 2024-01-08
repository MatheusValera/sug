async function main (): Promise<any> {
  console.log('entrou')
}

main()
  .then((result) => {
    console.log(result, 'a', 'b')
  })
  .catch((err) => {
    console.log(err, 'a', 'b')
  })
