from rest_framework import serializers
from GeoRun.models import Runner, Defi


class RunnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Runner
        fields = ['id', 'pseudo', 'mail', 'password']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Runner.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.pseudo = validated_data.get('pseudo', instance.pseudo)
        instance.mail = validated_data.get('mail', instance.mail)
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        return instance

class DefiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defi
        fields = ['id', 'nom', 'createur', 'date_creation', 'date_debut', 'date_fin']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Defi.objects.create(**validated_data)
    
    def to_representation(self, instance):
        self.fields['createur'] = RunnerSerializer()
        return super(DefiSerializer, self).to_representation(instance)
