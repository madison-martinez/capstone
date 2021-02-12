using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace FarmersSpecial.Models
{
    public class Order
    {
        public int Id { get; set; }      
        public double total { get; set; }
        public int userId { get; set; }
    }

}