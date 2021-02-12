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
    public class OrderController : ControllerBase
    {
        private readonly FarmersSpecialContext _context;

        public OrderController(FarmersSpecialContext context)
        {
            _context = context;
        }
        [HttpGet]
        // GET: api/Order
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            try
            {
                return await _context.Orders.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .FirstOrDefaultAsync(m => m.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // POST: /api/Order
        [HttpPost]

        public async Task<ActionResult<Order>> CreateOrder([Bind("Id, UserId, Items, Total")] Order order)
        {
            if (ModelState.IsValid)
            {
                _context.Add(order);
                await _context.SaveChangesAsync();
            }
            return order;
        }

        // Put: Order/5
        [HttpPut("{id}")]

        public async Task<ActionResult<Order>> EditOrder(int id, [Bind("Id, UserId, OrderItems, Total")] Order order)
        {
            order.Id = id;

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(order);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OrderExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return order;
        }
        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
