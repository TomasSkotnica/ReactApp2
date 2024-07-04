namespace ReactApp2.Server.Helpers
{
    public interface ICvsSerializer
    {
        public void SaveToCsv(List<ReactApp2.Server.Models.TodoItem> items, string filePath);
    }
}
