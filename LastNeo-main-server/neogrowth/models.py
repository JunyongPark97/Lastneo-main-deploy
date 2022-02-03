from django.db import models
from django.conf import settings

from accounts.models import User, MBTIMain


def random_meta_directory_path(instance, filename):
    return 'item/meta/{}'.format(filename)


def item_meta_directory_path(instance, filename):
    return 'item/meta/{}'.format(filename)


def item_full_directory_path(instance, filename):
    return 'item/full/{}'.format(filename)


def item_half_directory_path(instance, filename):
    return 'item/half/{}'.format(filename)


def item_detail_directory_path(instance, filename):
    return 'item/{}/{}'.format(instance.mbti.mbti_name, filename)


def item_detail_upper_directory_path(instance, filename):
    return 'item/{}/{}'.format(instance.mbti.mbti_name, filename)


class ItemClassifyMeta(models.Model):
    """
    아이템 부여 분류 기준이 되는 Meta 정보를 저장하는 모델입니다.
    매번 새로운 분류 기준이 나올 때마다 kinds 에 추가하는 방식으로 확장 가능성을 고려하였습니다.
    """
    RANDOM = -1
    SchSTIM = 0
    SchHEDO = 1
    SchACHI = 2
    SchPOWE = 3
    SchSECU = 4
    SchCONF = 5
    SchTRAD = 6
    SchBENE = 7
    SchUNIV = 8
    SchSEDI = 9
    Big5O = 10
    Big5C = 11
    Big5E = 12
    Big5A = 13
    Big5N = 14

    KINDS = (
        (-1, 'Schwartz 무제'),
        (0, 'Schwartz 자극'),
        (1, 'Schwartz 쾌락'),
        (2, 'Schwartz 성취'),
        (3, 'Schwartz 권력'),
        (4, 'Schwartz 안전'),
        (5, 'Schwartz 순응'),
        (6, 'Schwartz 전통'),
        (7, 'Schwartz 박애'),
        (8, 'Schwartz 보편'),
        (9, 'Schwartz 자율'),
        (10, 'Big5 O'),
        (11, 'Big5 C'),
        (12, 'Big5 E'),
        (13, 'Big5 A'),
        (14, 'Big5 N'),
    )
    classify_name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.classify_name


class Big5SubSection(models.Model):
    """
    Big5 의 성격 유형의 정도를 판단하는 최대값과 최솟값을 저장하고 이에 따른 정도를 지정하는 모델입니다.
    version 에 따라 그 척도가 변경될 수 있어 version field 를 추가하였습니다.
    """
    version = models.IntegerField(default=1, help_text="1주차, 2주차, ...n주차")
    subsection = models.CharField(max_length=20, null=True, blank=True, help_text="Big5 성격 정도 (ex. O, C, E, A, N)")
    max_value = models.FloatField(help_text="3가지 분류의 Big5를 나누는 max 기준")
    min_value = models.FloatField(help_text="3가지 분류의 Big5를 나누는 min 기준")
    section_value = models.IntegerField(null=True, blank=True, help_text="그 중에서도 1인지 2인지 3인지..")

    def __str__(self):
        return '{}주차 Big5 {}{}'.format(self.version, self.subsection, self.section_value)


class Tag(models.Model):
    """
    짬처리(?)를 담당하는 Tag 모델입니다.
    2021.12.30 기준 아이템 분류 기준 id 와 neo 의 성장을 위한 여러 문항들의 분류 기준을 담고 있습니다.
    """
    classify_id = models.ForeignKey(ItemClassifyMeta, on_delete=models.CASCADE, related_name="tags")
    big5_subsection_id = models.ForeignKey(Big5SubSection, on_delete=models.CASCADE, related_name='tags',
                                           null=True, blank=True)

    def __str__(self):
        if self.big5_subsection_id == None:
            return self.classify_id.classify_name
        else:
            return '{}주차 {}{}'.format(self.big5_subsection_id.version, self.classify_id.classify_name,
                                    self.big5_subsection_id.section_value)


class MainCategory(models.Model):
    """
    Neo 에 부여되는 item 을 구분하는 대분류가 담겨있는 모델입니다.
    가장 큰 카테고리를 집어넣는 모델로 확장 가능성을 고려하여 kinds 로 작성하였습니다.
    """
    HAT = 0
    HEADTHING = 1
    UPPER = 2
    BRACLET = 3
    NECKTHING = 4
    FACIALTHING = 5
    WEAPON = 6
    BACKPACK = 7
    OBJECT = 8
    BACKGROUND = 9

    KINDS = (
        (0, '모자'),
        (1, '머리 장식'),
        (2, '상의'),
        (3, '시계'),
        (4, '머플러'),
        (5, '얼굴 장식'),
        (6, '무기'),
        (7, '가방'),
        (8, '오브젝트'),
        (9, '배경')
    )
    main_category = models.IntegerField(choices=KINDS, default=0)

    def __str__(self):
        return self.get_main_category_display()


class SubCategory(models.Model):
    """
    Neo 에 부여되는 item 을 구분하는 소분류가 담겨있는 모델입니다.
    대분류보다 구체적으로 어떤 종류의 item 을 부여할지에 관한 정보를 저장합니다.
    """
    main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name='sub_categories')
    name = models.CharField(max_length=30, null=True, blank=True)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='sub_categories', null=True, blank=True)

    def __str__(self):
        return self.name


class ItemMeta(models.Model):
    """
    Neo 에 부여될 item 의 정보가 담긴 모델입니다.
    layer level 뿐만 아니라 레벨업 구조를 생각해 level 정보도 저장합니다.
    """
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=30)
    layer_level = models.IntegerField(default=0)
    version = models.IntegerField(default=1, help_text="version 이 바뀔 때마다 출시되는 아이템을 구분하기 위한 field")
    level = models.IntegerField(default=1, help_text="레벨업 구조를 위해 추가된 field. 같은 아이템이어도 이 level field 로 성장할"
                                                     "때 마다 구분하여 줄 수 있음")
    description = models.CharField(max_length=200, help_text="부여해주는 item 의 스토리 설명", null=True, blank=True)
    item_image = models.ImageField(null=True, blank=True, upload_to=item_meta_directory_path,
                                   help_text='네오 홈에서 아이템만 확대된 이미지 사진이 저장되는 field')
    item_full_image = models.ImageField(null=True, blank=True, upload_to=item_full_directory_path,
                                        help_text='전신 네오 이미지를 생성할 때 활용하는 아이템 이미지가 저장되는 field')
    item_half_image = models.ImageField(null=True, blank=True, upload_to=item_half_directory_path,
                                        help_text='상반신 네오 이미지를 생성할 때 활용하는 아이템 이미지가 저장되는 field')

    def __str__(self):
        return '{} & layer_level : {}'.format(self.name, self.layer_level)


class RandomItemMeta(models.Model):
    """
    배경같은 랜덤으로 지정되는 아이템의 메타 정보가 저장된 모델입니다.
    MBTI 에 따라서 묶여있는 RandomItemMeta 를 가져오기 위해서 MBTIMain을 ForeignKey 로 가지고 있습니다.
    """
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='random_item_metas')
    name = models.CharField(max_length=20, null=True, blank=True)
    layer_level = models.IntegerField(default=0)
    description = models.CharField(max_length=200, null=True, blank=True)
    item_image = models.ImageField(null=True, blank=True, upload_to=random_meta_directory_path)


class RandomItems(models.Model):
    """
    Neo 에 부여된 배경과 같은 랜덤 아이템들이 지정되었을 때 어떤 아이템이 지정되었는지 저장하는 모델입니다.
    """
    item_meta = models.ForeignKey(RandomItemMeta, on_delete=models.CASCADE, related_name='random_items')
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='random_items')
    created_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)


class ItemDetail(models.Model):
    """
    MBTI 에 따라 item 의 형태가 변할 수 있기 때문에 만들어진 모델입니다.
    같은 모양의 아이템도 존재하지만 표정과 같이 MBTI 마다 frame 이 조금씩은 달라질 수 있습니다.
    """
    item_meta = models.ForeignKey(ItemMeta, on_delete=models.CASCADE, related_name='details')
    layer_level = models.IntegerField(null=True, blank=True, help_text='mbti 마다 layer level 다를 수 있음.')
    mbti = models.ForeignKey(MBTIMain, on_delete=models.CASCADE, related_name='details')
    detail_image = models.ImageField(upload_to=item_detail_directory_path)
    detail_upper_image = models.ImageField(null=True, blank=True, upload_to=item_detail_upper_directory_path)


# 성격과 관련된 모델

class PersonalityItems(models.Model):
    item_meta = models.ForeignKey(ItemMeta, on_delete=models.CASCADE, related_name='personality_items')
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='personality_items')
    created_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)


class Big5Question(models.Model):
    """
    Big5 성격 질문이 저장되어 있는 모델입니다.
    추가로 만들어지는 성격 질문 유형의 경우는 새로운 모델을 만들어 사용하는 것으로 합니다.
    """
    section = models.CharField(max_length=10)
    question = models.CharField(max_length=100)
    weighted_value = models.FloatField(default=1.0, help_text="성격 질문에 가중치를 저장하는 field")


class Big5Answer(models.Model):
    """
    Big5 성격 질문에 대한 대답 결과를 저장하는 모델입니다.
    """
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE, related_name='big5_answers')
    big5_question = models.ForeignKey(Big5Question, on_delete=models.CASCADE, related_name='big5_answers')
    personality_items = models.ForeignKey(PersonalityItems, null=True, blank=True, on_delete=models.CASCADE, related_name='big5_answers')
    result = models.FloatField(default=100.0)
    created_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)


# 가치관과 관련된 모델

class ValuesItems(models.Model):
    item_meta = models.ForeignKey(ItemMeta, on_delete=models.CASCADE, related_name='values_items')
    neo = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='values_items')
    created_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)

class Schwartz(models.Model):
    """
    가치관을 판단하는 Schwartz 의 보편적 가치 이론 모델을 저장합니다.
    확장 가능성이 존재하지 않기 때문에 (이미 10개로 fix 가 되어있음) kinds 로 구현하지 않았습니다.
    """
    name = models.CharField(max_length=20)


class SchwartzMeta(models.Model):
    """
    57개에서 40개로 줄인 Schwartz 모델에 나오는 형용사를 저장하는 모델입니다.
    Schwartz 모델과 마찬가지로 확장 가능성이 존재하지 않음으로 kinds 로 구현하지 않았습니다.
    """
    schwartz = models.ForeignKey(Schwartz, on_delete=models.CASCADE, related_name='schwartz_metas')
    name = models.CharField(max_length=50, help_text="Schwartz 모델에 나오는 형용사")
    description = models.CharField(max_length=200, help_text="형용사에 해당하는 설명", null=True, blank=True)


class SchwartzAnswer(models.Model):
    """
    Schwartz 가치관 질문에 대한 대답 결과를 저장하는 모델입니다.
    """
    schwartz_meta = models.ForeignKey(SchwartzMeta, on_delete=models.CASCADE, related_name='schwartz_answers')
    values_items = models.ForeignKey(ValuesItems, on_delete=models.CASCADE, related_name='schwartz_answers')