from dataclasses import dataclass
import dataclasses
from enum import Enum
from typing import List
import json
import random


class Survey(str, Enum):
    DEMOGRAPHICS = "demographics"
    TLX = "tlx"
    DONE = "done"


class Condition(str, Enum):
    DesktopNoDecomp = "Desktop-NoDecomp"
    DesktopDecomp = "Desktop-Decomp"
    VRNoDecomp = "VR-NoDecomp"
    VRDecomp = "VR-Decomp"


@dataclass(eq=True, frozen=True)
class Statement:
    text: str
    correct: bool


@dataclass()
class State:
    view: Survey | Condition
    stateId: int
    toProof: str
    statements: List[Statement]
    arrangeable: bool
    leftHand: bool
    height: int  # in cm
    _views: List[Survey | Condition]  # for diagnostics
    _conditions: List[Condition]  # for diagnostics

    def as_dict(self):
        return dataclasses.asdict(self)

    def as_json(self):
        return json.dumps(dataclasses.asdict(self), indent=4, ensure_ascii=False)


test_state = State(
    view=Survey.DEMOGRAPHICS,
    stateId=2,
    toProof="Beweise: Alle Weintrinker sind rothaarig",
    statements=[
        Statement(text="alle Weintrinker sind 20 Jahre alt", correct=False),
        Statement(text="alle Weintrinker sind irisch", correct=True),
        Statement(text="alle Weintrinker wohnen in potsdam", correct=True),
        Statement(text="alle potsdamer sind klein", correct=True),
        Statement(text="alle iren haben große füße", correct=True),
        Statement(
            text="alle potsdamer, die große füße haben, sind abenteuerlustig", correct=True),
        Statement(
            text="alle potsdamer, die große füße haben und drei füße haben, sind irisch", correct=False),
        Statement(text="alle iren sind reich", correct=False),
        Statement(
            text="alle abenteuerlustigen, die medizin studieren, sind rothaarig", correct=False),
        Statement(text="alle münsteraner studieren medizin", correct=False),
        Statement(text="alle briten sind münsteraner", correct=False),
        Statement(
            text="alle abenteuerlustigen, die klein sind, sind rothaarig", correct=True),
    ],
    arrangeable=True,
    leftHand=False,
    height=175,
    _views=[Survey.DEMOGRAPHICS, Survey.TLX,
            Survey.DONE, Condition.DesktopDecomp],
    _conditions=[Condition.DesktopNoDecomp, Condition.DesktopDecomp]
)

def get_statements(task_index: int):
    statement_structures = [get_statements_v3, get_statements_v1, get_statements_v2]
    structure = statement_structures[task_index % len(statement_structures)]
    (proof, statements) = structure(*[statements_matrix[n][task_index] for n in range(len(statements_matrix))])

    random.shuffle(statements)

    if len(set(statements)) != len(statements):
        raise ValueError("duplicate statements")

    return (proof, statements)

def get_statements_v1(adj1: str, adj2: str, adj3: str, adj4: str, adj5: str, sub1: str, sub2: str, sub3: str, sub4: str, job1: str, job2: str, nat1: str, nat2: str):
    """returns a (toProof, statements list) tuple for the given adjectives, subjects, cities and nationalities. toProof is always true and has the form 'Beweise: Alle <sub3> sind <adj1>' """
    statements = [
        Statement(f"alle {adj2}en, die {adj3} sind, sind {adj1}", True),
        Statement(f"alle {job1} sind {adj2}", True),
        Statement(f"alle {sub3} sind {job1}", True),
        Statement(f"alle {job1}, die {sub2} haben, sind {adj3}", True),
        Statement(f"alle {sub3} sind {nat1}", True),
        Statement(f"alle {nat1} haben {sub2}", True),
        Statement(f"alle {sub3} sind {adj5}", False),
        Statement(f"alle {nat1} sind {adj4}", False),
        Statement(
            f"alle {job1}, die {sub2} und {sub4} haben, sind {nat1}", False),
        Statement(f"alle {adj3}en, die {sub1}e haben, sind {adj1}", False),
        Statement(f"alle {job2}en haben {sub1}e", False),
        Statement(f"alle {nat2} sind {job2}en", False),
    ]
    return (f"Beweise: Alle {sub3} sind {adj1}", statements)


def get_statements_v2(adj1: str, adj2: str, adj3: str, adj4: str, adj5: str, sub1: str, sub2: str, sub3: str, sub4: str, job1: str, job2: str, nat1: str, nat2: str):
    """returns a (toProof, statements list) tuple for the given adjectives, subjects, cities and nationalities. toProof is always true and has the form 'Beweise: Alle <sub3> sind <adj1>' """
    statements = [
        Statement(f"alle {adj2}en, die {adj3} sind, sind {adj1}", False),
        Statement(f"alle {sub3} sind {job1}", True),
        Statement(f"alle {job1}, die {sub2} haben, sind {adj3}", True),
        Statement(f"alle {sub3} sind {nat1}", True),
        Statement(f"alle {nat1} haben {sub2}", True),
        Statement(f"alle {sub3} sind {adj5}", False),
        Statement(f"alle {nat1} sind {adj4}", False),
        Statement(f"alle {job1}, die {sub2} und {sub4} haben, sind {nat2}", True),
        Statement(f"alle {adj3}en, die {sub1}e haben, sind {adj1}", True),
        Statement(f"alle {job2}en sind {adj4}", False),
        Statement(f"alle {nat2} haben {sub1}e", True),
        Statement(f"alle {sub3} haben {sub4}", True),
    ]
    return (f"Beweise: Alle {sub3} sind {adj1}", statements)

def get_statements_v3(adj1: str, adj2: str, adj3: str, adj4: str, adj5: str, sub1: str, sub2: str, sub3: str, sub4: str, job1: str, job2: str, nat1: str, nat2: str):
    """returns a (toProof, statements list) tuple for the given adjectives, subjects, cities and nationalities. toProof is always true and has the form 'Beweise: Alle <sub3> sind <adj1>' """
    statements = [
        Statement(f"alle {sub3} sind {adj5}", True),
        Statement(f"alle {sub3}, die {adj5} sind, sind {adj2}", True),
        Statement(f"alle {adj2}en sind {job1}", False),
        Statement(f"alle {sub3} sind {nat1}", True),
        Statement(f"alle {sub3}, die {nat1} sind, sind {adj1}", True),
        Statement(f"alle {adj1}en, die {nat1} sind, sind {job2}", True),
        Statement(f"alle {job2}, die {adj2} sind, sind {adj4}", True),
        Statement(f"alle {sub3}, die {job2} sind, sind {nat2}", False),
        Statement(f"alle {nat2}, die {job2} sind, haben {sub1}e", False),
        Statement(f"alle {sub2} sind {nat2}", False),
        Statement(f"alle {adj2}en haben {sub1}e", False),
        Statement(f"alle {nat2}, die {sub4} haben, sind {adj4}", False),
    ]
    return (f"Beweise: alle {sub3} sind {adj4}", statements)

def get_tutorial_statements():
    return (f"Beweise: Alle Daniel sind groß", [
        Statement("Daniel ist braunhaarig", True),
        Statement("Alle braunhaarigen sind groß", True),
        Statement("Alle großen sind nett", False)
    ])


statements_matrix = [
    # adj1
    ['freundlich', 'einundzwanzig', 'zweiundzwanzig', 'empathisch', 'vierundzwanzig', 'gesellig',
        'intelligent', 'siebenundzwanzig', 'achtundzwanzig', 'zielstrebig', 'lustig', 'einfühlsam'],
    # adj2
    ['blauhaarig', 'rothaarig', 'verrückt', 'toll', 'nett', 'gemein',
        'groß', 'klein', 'breit', 'schlank', 'braunhaarig', 'blond'],
    # adj3
    ['cool', 'fröhlich', 'schlau', 'verrückt', 'neugierig', 'stark',
        'abenteuerlustig', 'schlau', 'extravertiert', 'introvertiert', 'ruhig', 'sportlich'],
    # adj4
    ['fröhlich', 'groß', 'offen', 'herzlich', 'zurückhaltend', 'munter',
        'fröhlich', 'freundlich', 'aufgeschlossen', 'herzlich', 'mutig', 'fleißig'],
    # adj5
    ['zwanzig', 'kreativ', 'zuverlässig', 'dreiundzwanzig', 'verliebt', 'fünfundzwanzig',
        'sechsundzwanzig', 'charmant', 'geduldig', 'neunundzwanzig', 'dreißig', 'einunddreißig'],
    # sub1
    ['Flugzeug', 'Boot', 'Haustier', 'Tisch', 'Schmetterling', 'Ozean',
        'Monitor', 'Hund', 'Haustier', 'Pferd', 'Balkon', 'Regenschirm'],
    # sub2
    ['Katzen', 'Hunde', 'Blumen', 'Bücher', 'Haustiere', 'Wohnungen',
        'Schlüssel', 'Tische', 'Kinder', 'Häuser', 'Stühle', 'Fahrräder'],
    # sub3
    ['Max', 'Sophie', 'Lukas', 'Emily', 'Paul', 'Lena',
        'Jonas', 'Anna', 'Finn', 'Emma', 'Tim', 'Hannah'],
    # sub4
    ['Augen', 'Haare', 'Ohren', 'Arme', 'Beine', 'Hände',
        'Finger', 'Zehen', 'Nasen', 'Ohren', 'Schultern', 'Knie'],
    # job1
    ['Schuster', 'Designer', 'Lehrer', 'Verkäufer', 'Programmierer', 'Kellner',
        'Schneider', 'Bäcker', 'Bauarbeiter', 'Politiker', 'Schornsteinfeger', 'Schauspieler'],
    # job2
    ['Polizist', 'Lieferant', 'Architekt', 'Journalist', 'Astronaut', 'Psychotherapeut',
        'Laborant', 'Fotograf', 'Produzent', 'Pilot', 'Jurist', 'Konditor'],
    # nat1
    ['Iren', 'Deutsche', 'Franzosen', 'Italiener', 'Schweden', 'Mexikaner',
     'Amerikaner', 'Kanadier', 'Australier', 'Spanier', 'Brasilianer', 'Griechen'],
    # nat2
    ['Briten', 'Schweizer', 'Österreicher', 'Chinesen', 'Japaner', 'Inder',
     'Südafrikaner', 'Ägypter', 'Thailänder', 'Griechen', 'Kolumbianer', 'Türken']
]


def flatten(container):
    """source: https://stackoverflow.com/questions/10823877/what-is-the-fastest-way-to-flatten-arbitrarily-nested-lists-in-python
    Why does it need to be so complicated, Python?"""
    for i in container:
        if isinstance(i, (list, tuple)):
            for j in flatten(i):
                yield j
        else:
            yield i
