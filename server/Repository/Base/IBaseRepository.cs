namespace server.Repository.Base;

public interface IBaseRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();
    Task InsertAsync(T facility);
    Task DeleteAsync(T facility);
    Task UpdateAsync(T facility);
    Task<T> GetByIdAsync(long id);
}