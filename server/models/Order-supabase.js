const supabase = require('../db-supabase');

class Order {
  static async create(orderData) {
    const {
      user, customer, items, subtotal, shipping, total, paymentMethod, status = 'pending'
    } = orderData;

    // Generate order number
    const { count } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const orderNumber = `ORD-${Date.now()}-${(count || 0) + 1}`;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: user || null,
        customer_name: customer.name,
        customer_address: customer.address,
        customer_city: customer.city,
        customer_phone: customer.phone,
        customer_email: customer.email || null,
        items: items,
        subtotal,
        shipping,
        total,
        payment_method: paymentMethod,
        status,
      })
      .select()
      .single();

    if (error) throw error;
    return this.formatOrder(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.formatOrder(data);
  }

  static async findByOrderNumber(orderNumber) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error || !data) return null;
    return this.formatOrder(data);
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.formatOrder);
  }

  static async findAll() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(this.formatOrder);
  }

  static async update(id, updates) {
    const updateData = {};
    if (updates.status) updateData.status = updates.status;

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.formatOrder(data);
  }

  static formatOrder(order) {
    if (!order) return null;
    return {
      _id: order.id,
      id: order.id,
      orderNumber: order.order_number,
      user: order.user_id,
      customer: {
        name: order.customer_name,
        address: order.customer_address,
        city: order.customer_city,
        phone: order.customer_phone,
        email: order.customer_email,
      },
      items: order.items || [],
      subtotal: parseFloat(order.subtotal),
      shipping: parseFloat(order.shipping),
      total: parseFloat(order.total),
      paymentMethod: order.payment_method,
      status: order.status,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };
  }
}

module.exports = Order;



