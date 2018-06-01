using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Evolent.Sample.Core.Data;

namespace Evolent.Sample.Data.Mapping
{
    public class ContactMap: EntityTypeConfiguration<Contact>
    {
        public ContactMap()
        {
            HasKey(t => t.Id);
            Property(t => t.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(t => t.FirstName).IsRequired();
            Property(t => t.LastName).IsRequired();
            Property(t => t.Email).IsRequired();
            Property(t => t.PhoneNumber).IsRequired();
            Property(t => t.Status).IsRequired();
            ToTable("Contacts");
        }
    }
}
