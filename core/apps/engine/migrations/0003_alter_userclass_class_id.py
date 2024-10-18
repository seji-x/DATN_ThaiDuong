# Generated by Django 4.2.7 on 2024-10-11 08:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0002_remove_userclass_role_tenant'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userclass',
            name='class_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='class_id', related_query_name='class_id', to='engine.class'),
        ),
    ]
