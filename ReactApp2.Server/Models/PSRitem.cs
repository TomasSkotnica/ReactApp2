using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models;

public class PsrItem
{
    public string Gen { get; set; }
    public string Release { get; set; }
    [Key]
    public string Patchset { get; set; }
    public bool UnixBuild { get; set; }
}
