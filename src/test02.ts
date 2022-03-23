import 'reflect-metadata'

function logType(target: any, key: string) {
  console.log(0, target, key)
  const t = Reflect.getMetadata('design:type', target, key)
  console.log(`${key} type: ${t.name}`)
}

function logParamTypes(target: any, key: string) {
  console.log(1, target, key)
  const types = Reflect.getMetadata('design:paramtypes', target, key)
  console.log(`${key} param types: ${types}`)
}

function logReturnTypes(target: any, key: string) {
  console.log(2, target, key)
  const types = Reflect.getMetadata('design:returntype', target, key)
  console.log(`${key} return types: ${types}`)
}


class Demo01 {
  @logType // apply property decorator
  public attr1: string | undefined
}

class Foo {}
interface IFoo {}

class Demo02 {
  @logParamTypes // apply parameter decorator
  @logReturnTypes
  doSomething(
    param1: string,
    param2: number,
    param3: Foo,
    param4: { test: string },
    param5: IFoo,
    param6: Function,
    param7: (a: number) => void
  ): number {
    return 1
  }
}
