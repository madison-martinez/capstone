using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FarmersSpecial.Data;
using FarmersSpecial.Models;
using Microsoft.AspNetCore.Authorization;

namespace FarmersSpecial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
        public class ProductController : ControllerBase
    {
        private readonly FarmersSpecialContext _context;

        public ProductController(FarmersSpecialContext context)
        {
            _context = context;
        }
        [HttpGet]
        // GET: api/Product
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            try {
                return await _context.Products.ToListAsync();
            }
            catch 
            {
                throw;
            }
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var product = await _context.Products
                .FirstOrDefaultAsync(m => m.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // POST: /api/Product
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        
        public async Task<ActionResult<Product>> CreateProduct([Bind("Id,Title,Description,Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Add(product);
                await _context.SaveChangesAsync();
            }
            return product;
        }

        // Put: Product/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut("{id}")]
       
        public async Task<ActionResult<Product>> EditProduct(int id, [Bind("Id,Title,Description,Price")] Product product)
        {
            product.Id = id;

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(product);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return product;
        }

        // Delete: Product/5
        [HttpDelete("{id}")]
        
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
