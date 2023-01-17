class HelloService {
  async helloEndpoint() {
    return {
      status: 200,
      Message: 'Hello World',
    };
  }
}

export default new HelloService();
