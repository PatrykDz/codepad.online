using MongoDB.Driver;

namespace CodePad.Adapters.Mongo
{
    public static class MongoInitializer
    {
        public static MongoClient Init(string connectionString)
        {
            // "mongodb://root:example@127.0.0.1:5110"
            const string defaultConnectionString = "default";

            var client = new MongoClient(connectionString ?? defaultConnectionString);
            return client;
        }
    }
}