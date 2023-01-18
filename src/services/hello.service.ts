class HelloService {
  async helloEndpoint() {
    return {
      status: 200,
      message: 'Hello World',
    };
  }
}

export default new HelloService();
