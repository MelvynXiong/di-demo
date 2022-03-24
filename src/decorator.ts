import 'reflect-metadata'

export const META_METHOD = 'method'
export const META_PATH = 'path'

const createMethodDecorator =
  (method: string) =>
  (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(META_PATH, path, descriptor.value as any)
      Reflect.defineMetadata(META_METHOD, method, descriptor.value as any)
    }
  }

export const Controller = (path: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(META_PATH, path, target)
  }
}
export const Get = createMethodDecorator('GET')
export const Post = createMethodDecorator('POST')
