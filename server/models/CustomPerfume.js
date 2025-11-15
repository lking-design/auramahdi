const supabase = require('../db-supabase');

class CustomPerfume {
  static async create(customPerfumeData) {
    const {
      userId = 'guest',
      bottle,
      bottleName,
      perfumeType,
      perfumeTypeName,
      scent,
      scentName,
      concentration,
      price,
      status = 'pending',
    } = customPerfumeData;

    const { data, error } = await supabase
      .from('custom_perfumes')
      .insert({
        user_id: userId,
        bottle,
        bottle_name: bottleName,
        perfume_type: perfumeType,
        perfume_type_name: perfumeTypeName,
        scent,
        scent_name: scentName,
        concentration,
        price,
        status,
      })
      .select()
      .single();

    if (error) throw error;
    return this.formatCustomPerfume(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('custom_perfumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.formatCustomPerfume(data);
  }

  static async find(query = {}) {
    let supabaseQuery = supabase.from('custom_perfumes').select('*');

    if (query.userId) {
      supabaseQuery = supabaseQuery.eq('user_id', query.userId);
    }

    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });

    const { data, error } = await supabaseQuery;
    if (error) throw error;
    return (data || []).map(this.formatCustomPerfume);
  }

  static formatCustomPerfume(customPerfume) {
    if (!customPerfume) return null;
    return {
      _id: customPerfume.id,
      id: customPerfume.id,
      userId: customPerfume.user_id,
      bottle: customPerfume.bottle,
      bottleName: customPerfume.bottle_name,
      perfumeType: customPerfume.perfume_type,
      perfumeTypeName: customPerfume.perfume_type_name,
      scent: customPerfume.scent,
      scentName: customPerfume.scent_name,
      concentration: customPerfume.concentration,
      price: parseFloat(customPerfume.price),
      status: customPerfume.status,
      createdAt: customPerfume.created_at,
      updatedAt: customPerfume.updated_at,
    };
  }
}

module.exports = CustomPerfume;

