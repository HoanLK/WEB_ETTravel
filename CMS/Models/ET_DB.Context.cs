﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ETEntities : DbContext
    {
        public ETEntities()
            : base("name=ETEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Banner> Banner { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<CategoryProduct> CategoryProduct { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<Video> Video { get; set; }
        public virtual DbSet<webpages_Membership> webpages_Membership { get; set; }
        public virtual DbSet<webpages_OAuthMembership> webpages_OAuthMembership { get; set; }
        public virtual DbSet<webpages_Roles> webpages_Roles { get; set; }
        public virtual DbSet<CustomerRegister> CustomerRegister { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Partner> Partner { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
    }
}
