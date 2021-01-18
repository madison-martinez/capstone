using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;


namespace FarmersSpecial.Models
{
    public class ProductCount 
    {
        public List<Product> Products { get; set; }
    }
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
    }
}