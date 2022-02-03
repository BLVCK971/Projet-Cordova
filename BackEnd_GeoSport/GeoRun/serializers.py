from rest_framework import serializers
from GeoRun.models import Runner, Defi, Participation


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

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.nom = validated_data.get('nom', instance.nom)
        instance.createur = validated_data.get('createur', instance.createur)
        instance.date_creation = validated_data.get('date_creation', instance.date_creation)
        instance.date_debut = validated_data.get('date_debut', instance.date_debut)
        instance.date_fin = validated_data.get('date_fin', instance.date_fin)
        instance.save()
        return instance

    def to_representation(self, instance):
        self.fields['createur'] = RunnerSerializer()
        return super(DefiSerializer, self).to_representation(instance)


class ParticipationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participation
        fields = ['id', 'participant', 'defi', 'altitude', 'distance']

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Participation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.altitude = validated_data.get('altitude', instance.altitude)
        instance.distance = validated_data.get('distance', instance.distance)

        instance.save()
        return instance

    def to_representation(self, instance):
        self.fields['participant'] = RunnerSerializer()
        self.fields['defi'] = DefiSerializer()
        return super(ParticipationSerializer, self).to_representation(instance)