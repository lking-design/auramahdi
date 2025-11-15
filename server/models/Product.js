const supabase = require('../db-supabase');

class Product {
  static async find(query = {}) {
    let supabaseQuery = supabase.from('products').select('*');

    if (query.category) {
      supabaseQuery = supabaseQuery.eq('category', query.category);
    }

    if (query.featured === true || query.featured === 'true') {
      supabaseQuery = supabaseQuery.eq('featured', true);
    }

    if (query.search) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query.search}%,name_ar.ilike.%${query.search}%,description.ilike.%${query.search}%`);
    }

    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });

    const { data, error } = await supabaseQuery;
    if (error) throw error;
    return (data || []).map(this.formatProduct);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.formatProduct(data);
  }

  static async create(productData) {
    const {
      name, nameAr, description, descriptionAr, price, category, subcategory,
      images, fragranceNotes, stock, featured, rating, reviews
    } = productData;

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        name_ar: nameAr,
        description,
        description_ar: descriptionAr,
        price,
        category,
        subcategory: subcategory || null,
        images: images || [],
        fragrance_notes_top: fragranceNotes?.top || [],
        fragrance_notes_heart: fragranceNotes?.heart || [],
        fragrance_notes_base: fragranceNotes?.base || [],
        stock: stock || 0,
        featured: featured || false,
        rating: rating || 0,
        reviews: reviews || [],
      })
      .select()
      .single();

    if (error) throw error;
    return this.formatProduct(data);
  }

  static async update(id, updates) {
    const updateData = {};

    Object.keys(updates).forEach(key => {
      if (key === 'nameAr') {
        updateData.name_ar = updates[key];
      } else if (key === 'descriptionAr') {
        updateData.description_ar = updates[key];
      } else if (key === 'images' || key === 'reviews') {
        updateData[key] = updates[key];
      } else if (key === 'fragranceNotes') {
        if (updates[key].top) updateData.fragrance_notes_top = updates[key].top;
        if (updates[key].heart) updateData.fragrance_notes_heart = updates[key].heart;
        if (updates[key].base) updateData.fragrance_notes_base = updates[key].base;
      } else if (updates[key] !== undefined) {
        updateData[key] = updates[key];
      }
    });

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.formatProduct(data);
  }

  static async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static formatProduct(product) {
    if (!product) return null;
    return {
      _id: product.id,
      id: product.id,
      name: product.name,
      nameAr: product.name_ar,
      description: product.description,
      descriptionAr: product.description_ar,
      price: parseFloat(product.price),
      category: product.category,
      subcategory: product.subcategory,
      images: product.images || [],
      fragranceNotes: {
        top: product.fragrance_notes_top || [],
        heart: product.fragrance_notes_heart || [],
        base: product.fragrance_notes_base || [],
      },
      stock: product.stock,
      featured: Boolean(product.featured),
      rating: parseFloat(product.rating),
      reviews: product.reviews || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  }
}

module.exports = Product;


class Product {
  static async find(query = {}) {
    let supabaseQuery = supabase.from('products').select('*');

    if (query.category) {
      supabaseQuery = supabaseQuery.eq('category', query.category);
    }

    if (query.featured === true || query.featured === 'true') {
      supabaseQuery = supabaseQuery.eq('featured', true);
    }

    if (query.search) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query.search}%,name_ar.ilike.%${query.search}%,description.ilike.%${query.search}%`);
    }

    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });

    const { data, error } = await supabaseQuery;
    if (error) throw error;
    return (data || []).map(this.formatProduct);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.formatProduct(data);
  }

  static async create(productData) {
    const {
      name, nameAr, description, descriptionAr, price, category, subcategory,
      images, fragranceNotes, stock, featured, rating, reviews
    } = productData;

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        name_ar: nameAr,
        description,
        description_ar: descriptionAr,
        price,
        category,
        subcategory: subcategory || null,
        images: images || [],
        fragrance_notes_top: fragranceNotes?.top || [],
        fragrance_notes_heart: fragranceNotes?.heart || [],
        fragrance_notes_base: fragranceNotes?.base || [],
        stock: stock || 0,
        featured: featured || false,
        rating: rating || 0,
        reviews: reviews || [],
      })
      .select()
      .single();

    if (error) throw error;
    return this.formatProduct(data);
  }

  static async update(id, updates) {
    const updateData = {};

    Object.keys(updates).forEach(key => {
      if (key === 'nameAr') {
        updateData.name_ar = updates[key];
      } else if (key === 'descriptionAr') {
        updateData.description_ar = updates[key];
      } else if (key === 'images' || key === 'reviews') {
        updateData[key] = updates[key];
      } else if (key === 'fragranceNotes') {
        if (updates[key].top) updateData.fragrance_notes_top = updates[key].top;
        if (updates[key].heart) updateData.fragrance_notes_heart = updates[key].heart;
        if (updates[key].base) updateData.fragrance_notes_base = updates[key].base;
      } else if (updates[key] !== undefined) {
        updateData[key] = updates[key];
      }
    });

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.formatProduct(data);
  }

  static async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static formatProduct(product) {
    if (!product) return null;
    return {
      _id: product.id,
      id: product.id,
      name: product.name,
      nameAr: product.name_ar,
      description: product.description,
      descriptionAr: product.description_ar,
      price: parseFloat(product.price),
      category: product.category,
      subcategory: product.subcategory,
      images: product.images || [],
      fragranceNotes: {
        top: product.fragrance_notes_top || [],
        heart: product.fragrance_notes_heart || [],
        base: product.fragrance_notes_base || [],
      },
      stock: product.stock,
      featured: Boolean(product.featured),
      rating: parseFloat(product.rating),
      reviews: product.reviews || [],
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    };
  }
}

module.exports = Product;

