const supabase = require('../db-supabase');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, phone, address, role = 'user' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert({
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phone: phone || null,
        address_street: address?.street || null,
        address_city: address?.city || null,
        address_zipcode: address?.zipCode || null,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return this.formatUser(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone, address_street, address_city, address_zipcode, role, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.formatUser(data);
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !data) return null;
    return data;
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async update(id, updates) {
    const updateData = {};

    if (updates.name) updateData.name = updates.name;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.address) {
      if (updates.address.street !== undefined) updateData.address_street = updates.address.street;
      if (updates.address.city !== undefined) updateData.address_city = updates.address.city;
      if (updates.address.zipCode !== undefined) updateData.address_zipcode = updates.address.zipCode;
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.formatUser(data);
  }

  static formatUser(user) {
    if (!user) return null;
    const formatted = {
      _id: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: {
        street: user.address_street,
        city: user.address_city,
        zipCode: user.address_zipcode,
      },
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
    // Remove null address fields
    if (!formatted.address.street && !formatted.address.city && !formatted.address.zipCode) {
      formatted.address = undefined;
    }
    return formatted;
  }
}

module.exports = User;

