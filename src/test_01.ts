import 'reflect-metadata'

// type Constructor<T = any> = new (...args: any[]) => T

// const Injectable = (): ClassDecorator => target => {}

// class OtherService {
//   a = 1
// }

// @Injectable()
// class TestService {
//   constructor(public readonly otherService: OtherService) {}

//   testMethod() {
//     console.log(this.otherService.a)
//   }
// }

// const Factory = <T>(target: Constructor<T>): T => {
//   // 获取所有注入的服务
//   const providers = Reflect.getMetadata('design:paramtypes', target) // [OtherService]
//   console.log(2, providers)
//   const args = providers.map((provider: Constructor) => new provider())
//   return new target(...args)
// }

// Factory(TestService).testMethod() // 1

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance)
  console.log(1, prototype)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
  // .filter(item => !isConstructor(item) && isFunction(prototype[item]))；
  console.log(2, methodsNames)
  return methodsNames.map((methodName) => {
    const fn = prototype[methodName]

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodName,
    }
  })
}

const Controller = (path: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
  }
}

const createMappingDecorator =
  (method: string) =>
  (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value as any)
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value as any)
    }
  }

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/b')
  somePostMethod() {}
}
console.log(Reflect.getMetadata(PATH_METADATA, SomeClass)) // '/test'

console.log(mapRoute(new SomeClass()))
