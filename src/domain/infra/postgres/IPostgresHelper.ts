export interface IPostgresHelper {
  query (textQuery: string, params?: any): any
}
