import 'reflect-metadata'
@Reflect.metadata('classExtension', 'This is a class extension!')
class Test {
  @Reflect.metadata('methodExtension', 'This is a method extension!')
  public hello(): string {
    return 'hello world'
  }
}

console.log(Reflect.getMetadata('classExtension', Test)) // This is a class extension!
console.log(Reflect.getMetadata('methodExtension', new Test(), 'hello')) // This is a method extension!
