using MongoDB.Driver;

namespace CodePad.Adapters.Mongo
{
    public static class MongoInitializer
    {
        public static MongoClient Init()
        {
            var client = new MongoClient(
                "mongodb://root:example@127.0.0.1:5110");
            return client;
        }
    }
}