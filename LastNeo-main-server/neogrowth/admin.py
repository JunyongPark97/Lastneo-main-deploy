from django.contrib import admin

from neogrowth.models import Schwartz, SchwartzMeta, Tag, SubCategory, MainCategory, ItemMeta, ItemDetail, \
    ItemClassifyMeta, Big5Question, Big5SubSection, Big5Answer, PersonalityItems, ValuesItems, SchwartzAnswer, \
    RandomItems, RandomItemMeta


class SchwartzAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


class SchwartzMetaAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_schwartz', 'name', 'description']

    def get_schwartz(self, obj):
        return obj.schwartz.name


class TagAdmin(admin.ModelAdmin):
    list_display = ['get_classify_id', 'get_big5_subsection_id']

    def get_classify_id(self, obj):
        return obj.classify_id.classify_name

    def get_big5_subsection_id(self, obj):
        return obj.big5_subsection_id.__str__


class MainCategoryAdmin(admin.ModelAdmin):
    list_display = ['get_main_category']

    def get_main_category(self, obj):
        return obj.get_main_category_display()


class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['get_main_category', 'name', 'get_tag']

    def get_main_category(self, obj):
        return obj.main_category.get_main_category_display()

    def get_tag(self, obj):
        if obj.tag.big5_subsection_id == None:
            return obj.tag.classify_id.classify_name
        else:
            return '{}주차 {}{}'.format(obj.tag.big5_subsection_id.version, obj.tag.classify_id.classify_name,
                                      obj.tag.big5_subsection_id.section_value)


class ItemMetaAdmin(admin.ModelAdmin):
    list_display = ['get_sub_category', 'name', 'layer_level', 'version', 'level', 'description', 'item_image']

    def get_sub_category(self, obj):
        return obj.sub_category.name


class ItemDetailAdmin(admin.ModelAdmin):
    list_display = ['get_item_meta', 'get_mbti', 'detail_image']

    def get_item_meta(self, obj):
        return obj.item_meta.name

    def get_mbti(self, obj):
        return obj.mbti.mbti_name


class ItemClassifyMetaAdmin(admin.ModelAdmin):
    list_display = ['classify_name']


class Big5QuestionAdmin(admin.ModelAdmin):
    list_display = ['section', 'question', 'weighted_value']


class Big5SubsectionAdmin(admin.ModelAdmin):
    list_display = ['version', 'subsection', 'max_value', 'min_value', 'section_value']


class Big5AnswerAdmin(admin.ModelAdmin):
    list_display = ['neo', 'big5_question', 'result']


class PersonalityItemsAdmin(admin.ModelAdmin):
    list_display = ['item_meta', 'neo']


class RandomItemMetaAdmin(admin.ModelAdmin):
    list_display = ['get_sub_category', 'layer_level', 'description', 'item_image', 'name']

    def get_sub_category(self, obj):
        return obj.sub_category.name


class RandomItemsAdmin(admin.ModelAdmin):
    list_display = ['item_meta', 'neo']


class ValueItemsAdmin(admin.ModelAdmin):
    list_display = ['get_item_meta', 'neo']

    def get_item_meta(self, obj):
        return obj.item_meta.name


class SchwartzAnswersAdmin(admin.ModelAdmin):
    list_display = ['get_schwartz_meta', 'values_items']

    def get_schwartz_meta(self, obj):
        return obj.schwartz_meta.name


admin.site.register(RandomItems, RandomItemsAdmin)
admin.site.register(RandomItemMeta, RandomItemMetaAdmin)
admin.site.register(Big5Question, Big5QuestionAdmin)
admin.site.register(ItemClassifyMeta, ItemClassifyMetaAdmin)
admin.site.register(ItemMeta, ItemMetaAdmin)
admin.site.register(ItemDetail, ItemDetailAdmin)
admin.site.register(MainCategory, MainCategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Schwartz, SchwartzAdmin)
admin.site.register(SchwartzMeta, SchwartzMetaAdmin)
admin.site.register(Big5SubSection, Big5SubsectionAdmin)
admin.site.register(PersonalityItems, PersonalityItemsAdmin)
admin.site.register(ValuesItems, ValueItemsAdmin)
admin.site.register(Big5Answer, Big5AnswerAdmin)
admin.site.register(SchwartzAnswer, SchwartzAnswersAdmin)
