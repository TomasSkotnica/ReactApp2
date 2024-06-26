namespace ReactApp1.Server.Helpers
{
    public interface ICvsSerializer
    {
        public void SaveToCsv(List<ReactApp1.Server.Models.TodoItem> items, string filePath);
    }
}
